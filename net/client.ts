import { decrypt, encrypt } from "./blowfish"
import { Peer, type WrappedPacket } from "./peer"
import { ENetChannels, Teams, type BasePacket } from "./pkt"
import { world } from "../ecf/world"
import { config } from "../config"
import { assign } from "../utils"
import * as PKT from './pkt'

export let client: Client

export class Client {
    
    private host = ''
    private port = 0
    
    private peer!: Peer
    private socket!: Bun.udp.Socket<"buffer">
    private onpacket!: (packet: WrappedPacket) => void

    public static async init(){
        client = new Client()
        await client.init()
    }

    private async init(){

        this.peer = new Peer({
            name: "Client",
            onsend: (data) => {
                this.socket.send(data, this.port, this.host)
            },
        })

        this.socket = await Bun.udpSocket<'buffer'>({
            hostname: '127.0.0.1',
            port: 5119,
            socket: {
                data: (socket, data, port, address) => {

                    this.host = address
                    this.port = port

                    const packets = this.peer.receivePackets(data)
                    for(const packet of packets){
                        this.onpacket(packet)
                    }
                },
            },
        })

        const gen = this.processPacket(); gen.next()
        this.onpacket = (packet: WrappedPacket) => {
            gen.next(packet)
        }
    }

    public send<T extends BasePacket>(packet: T, obj?: Partial<T>, channelID: ENetChannels = ENetChannels.GENERIC_APP_BROADCAST){
    
        if(obj) assign(packet, obj)
    
        //console.log('sent', packet)
        //console.log('read', (new pkt[packet.constructor.name]()).read(data))
        //console.log('data', data)
        //console.log('sent', channelID, data)
    
        let data = packet.write()
        data = encrypt(data)
        this.peer.sendUnreliable([{
            channelID: channelID,
            fragment: undefined,
            data: data,
        }])
    }

    private *processPacket(): Generator<void, void, WrappedPacket> {

        const startTime = Date.now()
        const player = config.players[0]!
        const orderPlayers = config.players.filter(player => player.teamID == Teams.Order)
        const chaosPlayers = config.players.filter(player => player.teamID == Teams.Chaos)

        {
            const { channelID, data } = yield
            console.assert(channelID == ENetChannels.DEFAULT)
            const packet = new PKT.RegistryPacket().read(data)
            this.send(packet, {}, ENetChannels.DEFAULT)
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
            this.send(new PKT.S2C_QueryStatusAns(), {
                res: true,
            })
        }

        {
            let { channelID, data } = yield; data = decrypt(data)
            console.assert(data[0] == PKT.Type.SynchVersionC2S)
            const packet = new PKT.SynchVersionC2S().read(data)

            this.send(new PKT.SynchVersionS2C(), {
                versionString: "1.0.0.126",
                isVersionOk: true,
                mapToLoad: config.mapToLoad,
                mapMode: config.mapMode,
                playerInfo: config.players.map(config => {
                    return assign(new PKT.PlayerLiteInfo(), {
                        playerId: BigInt(config.playerId),
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

            this.send(new PKT.World_SendGameNumber(), {
                gameID: 1n,
            })
            
            this.send(new PKT.TeamRosterUpdate(), {
                teamsize_order: 6,
                teamsize_chaos: 6,
                orderMembers: orderPlayers.map(player => BigInt(player.playerId)),
                chaosMembers: chaosPlayers.map(player => BigInt(player.playerId)),
                current_teamsize_order: orderPlayers.length,
                current_teamsize_chaos: chaosPlayers.length,
            })

            this.send(new PKT.RequestRename(), {
                playerId: BigInt(player.playerId),
                skinID: player.skinID,
                buffer: player.name,
            })
    
            this.send(new PKT.RequestReskin(), {
                playerId: BigInt(player.playerId),
                skinID: player.skinID,
                buffer: player.skin,
            })
            
            this.send(new PKT.RegistryPacket(), {
                playerID: BigInt(player.playerId),
            }, ENetChannels.DEFAULT)
        }
        
        {
            this.send(new PKT.SynchSimTimeS2C(), {
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

                this.send(new PKT.S2C_Ping_Load_Info(), {
                    clientID: player.clientID,
                    playerID: BigInt(player.playerId),
                    percentage: packet.percentage,
                    ETA: packet.ETA,
                    count: packet.count,
                    ping: packet.ping,
                    ready: packet.ready,
                })
            }
            else
            if(data[0] == PKT.Type.C2S_CharSelected){

                this.send(new PKT.S2C_StartSpawn(), {
                    numBotsOrder: orderPlayers.filter(player => player.isBot).length,
                    numBotsChaos: chaosPlayers.filter(player => player.isBot).length,
                })

                world.spawn()

                this.send(new PKT.S2C_EndSpawn())
            }
            else
            if(data[0] == PKT.Type.C2S_ClientReady){

                this.send(new PKT.S2C_StartGame(), {
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
                this.send(new PKT.World_SendCamera_Server_Acknologment(), {
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
}