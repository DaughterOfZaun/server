import { decrypt, encrypt } from "./net/blowfish"
import { Peer, type WrappedPacket } from "./net/peer"
import { ENetChannels, Teams, type BasePacket } from "./net/pkt"
import { World } from "./ecf/world"
import * as PKT from './net/pkt'
import { config } from "./config"

export function assign<T extends {}>(target: T, source: Partial<T>): T {
    return Object.assign(target, source)
}

const client = {
    host: '', port: 0,
    peer: new Peer({
        name: "Client",
        onsend: (data) => {
            client.socket.send(data, client.port, client.host)
        },
    }),
    socket: await Bun.udpSocket<'buffer'>({
        hostname: '127.0.0.1',
        port: 5119,
        socket: {
            data(socket, data, port, address){

                client.host = address
                client.port = port

                const packets = client.peer.receivePackets(data)
                for(const packet of packets){
                    client.onpacket(packet)
                }
            },
        },
    }),
    onpacket: (() => {
        const gen = processPacket()
        gen.next()
        return (packet: WrappedPacket) => {
            gen.next(packet)
        }
    })(),
}

export function send<T extends BasePacket>(packet: T, obj?: Partial<T>, channelID: ENetChannels = ENetChannels.GENERIC_APP_BROADCAST){

    if(obj) assign(packet, obj)

    //console.log('sent', packet)
    //console.log('read', (new pkt[packet.constructor.name]()).read(data))
    //console.log('data', data)
    //console.log('sent', channelID, data)

    let data = packet.write()
    data = encrypt(data)
    client.peer.sendUnreliable([{
        channelID: channelID,
        fragment: undefined,
        data: data,
    }])
}

const world = new World()
const startTime = Date.now()

function *processPacket(): Generator<void, void, WrappedPacket> {

    const player = config.players[0]!
    const orderPlayers = config.players.filter(player => player.teamID == Teams.Order)
    const chaosPlayers = config.players.filter(player => player.teamID == Teams.Chaos)

    {
        const { channelID, data } = yield
        console.assert(channelID == ENetChannels.DEFAULT)
        const packet = new PKT.RegistryPacket().read(data)
        send(packet, {}, ENetChannels.DEFAULT)
    }
    {
        let { channelID, data } = yield; data = decrypt(data)
        console.assert(data[0] == PKT.Type.C2S_Reconnect)
        const packet = new PKT.C2S_Reconnect().read(data)
        console.assert(packet.isFullReconnect)
    }

    for(let i = 0; i < 2; i++){
        let { channelID, data } = yield; data = decrypt(data)
        console.assert(data[0] == PKT.Type.C2S_QueryStatusReq)
        //const packet = new PKT.S2C_QueryStatusReq().read(data)
        send(new PKT.S2C_QueryStatusAns(), {
            res: true,
        })
    }

    {
        let { channelID, data } = yield; data = decrypt(data)
        console.assert(data[0] == PKT.Type.SynchVersionC2S)
        const packet = new PKT.SynchVersionC2S().read(data)

        send(new PKT.SynchVersionS2C(), {
            versionString: "1.0.0.126",
            isVersionOk: true,
            mapToLoad: config.mapToLoad,
            mapMode: config.mapMode,
            playerInfo: config.players.map(config => {
                return assign(new PKT.PlayerLiteInfo(), {
                    playerId: config.playerId,
                    summonerLevel: config.summonerLevel,
                    summonerSpell1: 0x03657421, //TODO:
                    summonerSpell2: 0x065E8695, //TODO:
                    isBot: config.isBot,
                    teamId: config.teamID,
                    botName: config.botName,
                    botSkinName: config.botSkinName,
                    botDifficulty: config.botDifficulty,
                    profileIconId: config.profileIconId,
                })
            }),
        })
    }

    {
        let { channelID, data } = yield; data = decrypt(data)
        console.assert(channelID == ENetChannels.MIDDLE_TIER_ROSTER)
        console.assert(data[0] == PKT.PayloadType.RequestJoinTeam)
        //const packet = new RequestJoinTeam().read(data)
        //console.log(packet)
        console.log('read', 'RequestJoinTeam')
        console.log('buffer', data)

        send(new PKT.World_SendGameNumber(), {
            gameID: 1n,
        })
        
        send(new PKT.TeamRosterUpdate(), {
            teamsize_order: 6,
            teamsize_chaos: 6,
            orderMembers: orderPlayers.map(player => player.playerId),
            chaosMembers: chaosPlayers.map(player => player.playerId),
            current_teamsize_order: orderPlayers.length,
            current_teamsize_chaos: chaosPlayers.length,
        })

        send(new PKT.RequestRename(), {
            playerId: player.playerId,
            skinID: player.skinID,
            buffer: player.name,
        })
 
        send(new PKT.RequestReskin(), {
            playerId: player.playerId,
            skinID: player.skinID,
            buffer: player.skin,
        })
        
        send(new PKT.RegistryPacket(), {
          playerID: player.playerId,
        }, ENetChannels.DEFAULT)
    }
    
    {
        send(new PKT.SynchSimTimeS2C(), {
            synchtime: (Date.now() - startTime) / 1000
        })
    }

    while(true){
        let { channelID, data } = yield; data = decrypt(data)

        if(data[0] == PKT.Type.SynchSimTimeC2S){
            //TODO: Send SynchSimTimeS2C.
            //TODO: Send SyncSimTimeFinalS2C.
        }
        else
        if(data[0] == PKT.Type.C2S_Ping_Load_Info){

            const packet = new PKT.C2S_Ping_Load_Info().read(data)
            //console.log(packet)

            send(new PKT.S2C_Ping_Load_Info(), {
                clientID: player.clientID,
                playerID: player.playerId,
                percentage: packet.percentage,
                ETA: packet.ETA,
                count: packet.count,
                ping: packet.ping,
                ready: packet.ready,
            })
        }
        else
        if(data[0] == PKT.Type.C2S_CharSelected){

            send(new PKT.S2C_StartSpawn(), {
                numBotsOrder: orderPlayers.filter(player => player.isBot).length,
                numBotsChaos: chaosPlayers.filter(player => player.isBot).length,
            })

            world.spawn()

            send(new PKT.S2C_EndSpawn())
        }
        else
        if(data[0] == PKT.Type.C2S_ClientReady){

            send(new PKT.S2C_StartGame(), {
                tournamentPauseEnabled: false,
            })

            break
        }
        else
        if(data[0] == PKT.Type.SendSelectedObjID){
        
            // Ignore.
        
        }
        else {
            console.assert(false, 'unexpected', PKT.Type[data[0]!], channelID, data)
        }
    }

    world.spin()

    while(true){
        let { channelID, data } = yield; data = decrypt(data)
        
        const expected = [
            
            // TUTORIAL
            //PKT.Type.C2S_TutorialAudioEventFinished,
            //PKT.Type.C2S_OnTutorialPopupClosed,
            //PKT.Type.C2S_OnQuestEvent,
            
            // CONNECTION
            //PKT.Type.C2S_ClientConnect_NamedPipe,
            //PKT.Type.C2S_QueryStatusReq,
            //PKT.Type.C2S_Ping_Load_Info,
            //PKT.Type.SynchVersionC2S,
            //PKT.Type.C2S_CharSelected,
            //PKT.Type.C2S_ClientReady,
            
            // SPAM
            PKT.Type.World_SendCamera_Server,
            PKT.Type.World_LockCamera_Server,
            PKT.Type.C2S_WriteNavFlags_Acc,
            PKT.Type.C2S_StatsUpdateReq,
            PKT.Type.SynchSimTimeC2S,
            PKT.Type.Waypoint_Acc,
            
            // GAME LOOP
            PKT.Type.C2S_ClientFinished,
            PKT.Type.C2S_Reconnect,
            PKT.Type.C2S_Exit,
            
            // UNIT ACTIONS
            PKT.Type.NPC_UpgradeSpellReq,
            PKT.Type.NPC_IssueOrderReq,
            PKT.Type.NPC_CastSpellReq,
            PKT.Type.C2S_PlayEmote,
            PKT.Type.UseObjectC2S,

            // ITEMS
            PKT.Type.RemoveItemReq,
            PKT.Type.SwapItemReq,
            PKT.Type.BuyItemReq,
            
            // UI ACTIONS
            PKT.Type.C2S_OnScoreBoardOpened,
            PKT.Type.C2S_TeamSurrenderVote,
            PKT.Type.SendSelectedObjID,
            PKT.Type.C2S_OnShopOpened,
            PKT.Type.C2S_OnTipEvent,
            PKT.Type.C2S_MapPing,

            // ?
            PKT.Type.C2S_OnRespawnPointEvent,
            
            // ANTIBOT
            //PKT.Type.C2S_AntiBotDP,
            //PKT.Type.C2S_AntiBot,
        ]

        if(data[0] == PKT.Type.World_SendCamera_Server){
            const packet = new PKT.World_SendCamera_Server().read(data)
            send(new PKT.World_SendCamera_Server_Acknologment(), {
                syncID: packet.syncID,
            })
        } else
        if(expected.includes(data[0]!)){
            if(data[0] == PKT.Type.NPC_IssueOrderReq){
                const packet = new PKT.NPC_IssueOrderReq().read(data)

                world.input(packet)
            
            }
            else {
                console.log('read', channelID, PKT.Type[data[0]!])
            }
        } else {
            console.assert(false, 'unexpected', channelID, PKT.Type[data[0]!], data)
        }
    }
}
