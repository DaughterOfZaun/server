import { LookAtType, NetNodeID } from "../net/pkt";
import { Teams } from "../ecf/systems/shared";
import { vec2, Vector3 } from "../math"
import { assign } from '../utils'
import * as PKT from "../net/pkt"
import { HeroAI } from "../data/scripts/hero";
import type { AIComponent } from "../ecf/systems/ai/component";
import { AutoAttackComponent } from "../ecf/systems/aa/component";
import { DataComponent } from "../ecf/systems/data/component";
import { BuffComponent } from "../ecf/systems/buffs/component";
import { MovementComponent } from "../ecf/systems/movement/component";
import { Unit } from "../ecf/unit";
import { SpellsComponent } from "../ecf/systems/spells/component";
import { StatusComponent } from "../ecf/systems/status/component";
import { AvatarVars, CharVars } from "../data/characters/vars";
import { HeroStats } from "./hero-stats";
import { client } from "../net/client";
import { PassiveComponent } from "../ecf/systems/passive/component";

export class Avatar {
    vars?: AvatarVars
}

export class Hero extends Unit {

    name: string = ''
    playerID: number = 0

    override ai: AIComponent = new HeroAI(this)
    override aa: AutoAttackComponent = new AutoAttackComponent(this)
    override data: DataComponent = new DataComponent(this)
    override buffs: BuffComponent = new BuffComponent(this)
    override stats: HeroStats = new HeroStats(this)
    override movement: MovementComponent = new MovementComponent(this)
    override spells: SpellsComponent = new SpellsComponent(this)
    override status: StatusComponent = new StatusComponent(this)
    override passive: PassiveComponent = new PassiveComponent(this)
    override avatar: Avatar = new Avatar()

    public spawn(spawnPosIndex: number){
        
        client.send(new PKT.S2C_CreateHero(), {
            netObjID: this.netID,
            playerUID: this.playerID,
            netNodeID: NetNodeID.Spawned,
            skillLevel: this.stats.level,
            teamIsOrder: this.team == Teams.Order,
            isBot: false,
            botRank: 0,
            spawnPosIndex: spawnPosIndex,
            skinID: this.data.skinID,
            skin: this.data.skin,
            name: this.name,
        })

        client.send(new PKT.OnEnterVisiblityClient(), {
            items: [],
            lookAtType: LookAtType.None,
            lookAtPosition: Vector3.Zero,
            movementData: assign(new PKT.MovementDataStop(), {
                position: vec2(200, 5356),
                forward: vec2(0, 1),
                syncID: 0,
            }),
            senderNetID: this.netID,
        })
    }
}
