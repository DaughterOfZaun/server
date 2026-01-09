import { LookAtType, NetNodeID, Teams } from "../net/pkt";
import { vec2, Vector3 } from "../math"
import { assign, send } from '../index'
import * as PKT from "../net/pkt"
import { HeroAI } from "../data/scripts/hero";
import type { AIComponent } from "../ecf/systems/ai/component";
import { AutoAttackComponent } from "../ecf/systems/aa/component";
import { DataComponent } from "../ecf/systems/data/component";
import { BuffComponent } from "../ecf/systems/buffs/component";
import { StatsComponent } from "../ecf/systems/stats/component";
import { MovementComponent } from "../ecf/systems/movement/component";
import { Unit } from "../ecf/unit";
import { SpellsComponent } from "../ecf/systems/spells/component";
import { StatusComponent } from "../ecf/systems/status/component";

class HeroStats extends StatsComponent {
    
    exp: number = 0
    gold: number = 0
    level: number = 0
    minionsKilled: number = 0

    public override write() {

        const hero = this.unit as Hero

        this.setPrimaryID(0)
        this.writeFloat(0, 0, this.exp)
        this.writeFloat(1, 0, this.gold)
        //TODO:this.writeUInt(2, hero.spells.enabled)
        this.writeUInt(3, 3) //TODO: Investigate.
        //TODO: this.writeFloat(4, 0, hero.spells.q.cost)
        //TODO: this.writeFloat(5, 0, hero.spells.w.cost)
        //TODO: this.writeFloat(6, 0, hero.spells.e.cost)
        //TODO: this.writeFloat(7, 0, hero.spells.r.cost)

        this.setPrimaryID(1)
        this.writeUInt(0, hero.status.actionState)
        this.writeBool(1, hero.status.isMagicImmune)
        this.writeBool(2, hero.status.isInvulnerable)
        this.writeBool(3, hero.status.isTargetable)
        this.writeUInt(4, hero.status.isTargetableToTeam)
        this.writeBool(5, hero.status.isPhysicalImmune)
        this.writeFloat(6, 0, this.baseAttackDamage)
        this.writeFloat(7, 0, this.baseAbilityDamage)
        this.writeFloat(8, 2, this.dodge)
        this.writeFloat(9, 2, this.crit)
        this.writeFloat(10, 0, this.armor)
        this.writeFloat(11, 0, this.spellBlock)
        this.writeFloat(12, 1, this.hpRegenRate)
        this.writeFloat(13, 1, this.parRegenRate)
        this.writeFloat(14, 0, this.attackRange)
        this.writeFloat(15, 0, this.flatPhysicalDamageMod)
        this.writeFloat(16, 2, this.percentPhysicalDamageMod)
        this.writeFloat(17, 0, this.flatMagicDamageMod)
        this.writeFloat(18, 0, this.percentMagicDamageMod)
        this.writeFloat(19, 0, this.flatMagicReduction)
        // //TODO: this.writeFloat(20, 0, this.percentMagicReduction)
        this.writeFloat(20, 2, this.attackSpeedMod)
        this.writeFloat(21, 2, this.dodge) //TODO: Investigate.
        this.writeFloat(22, 2, this.percentCooldownMod)
        this.writeFloat(23, 2, this.flatArmorPenetrationMod)
        this.writeFloat(24, 2, 1 - this.percentArmorPenetrationMod)
        this.writeFloat(25, 2, this.flatMagicPenetrationMod)
        this.writeFloat(26, 2, 1 - this.percentMagicPenetrationMod)
        this.writeFloat(27, 2, this.percentLifeStealMod)
        this.writeFloat(28, 2, this.percentSpellVampMod)

        //TODO: this.setPrimaryID(2)
        //TODO: this.writeBool(0, hero.isMagicImmune)
        //TODO: this.writeBool(1, hero.isInvulnerable)

        this.setPrimaryID(3)
        this.writeFloat(0, 0, this.health)
        this.writeFloat(1, 0, this.par)
        this.writeFloat(2, 0, this.maxHealth)
        this.writeFloat(3, 0, this.maxPAR)
        this.writeFloat(4, 0, this.flatBubbleRadiusMod)
        this.writeFloat(5, 2, this.percentBubbleRadiusMod)
        this.writeFloat(6, 2, this.movementSpeed)
        this.writeFloat(7, 2, this.scaleSkinCoef)
        this.writeUInt(8, this.level)
        this.writeUInt(9, this.minionsKilled)
        // //AB: this.writeFloat(9, 2, hero.collision.radius)
        // //AB: this.writeUInt(10, this.minionsKilled)
    }
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

    public spawn(spawnPosIndex: number){
        
        send(new PKT.S2C_CreateHero(), {
            netObjID: 1073741877,
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

        send(new PKT.OnEnterVisiblityClient(), {
            items: [],
            lookAtType: LookAtType.None,
            lookAtPosition: Vector3.Zero,
            movementData: assign(new PKT.MovementDataStop(), {
                position: vec2(35.9028, 273.5519),
                forward: vec2(0, 1),
                syncID: 0,
            }),
            senderNetID: 1073741877,
        })
    }
}
