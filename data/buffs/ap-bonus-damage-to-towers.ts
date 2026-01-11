import { BuffAddType, BuffScript, BuffScriptMetadata, BuffType, DamageSource, DamageType, LastTimeExecuted, PARType, SpellbookType, SpellDataFlags, SpellSlotType, type AdditionResult, type AttackableUnit, type float, type HitDamage, type int, type ObjAIBase, type Spell } from "../../api"
import * as API from "../../api"

import { DisconnectTimer } from "./disconnect-timer"

export class APBonusDamageToTowers extends BuffScript {
    
    public static override metadata = new BuffScriptMetadata({
        buffName: "APBonusDamageToTowers",
        buffTextureName: "Minotaur_ColossalStrength.dds",
        nonDispellable: true,
        persistsThroughDeath: true,
    })

    lastTimeExecuted = new LastTimeExecuted()
    public override onDisconnect(){
        API.spellBuffAdd(this.unit, this.unit, new DisconnectTimer(), 1, 1, 25000, BuffAddType.RENEW_EXISTING, BuffType.INTERNAL, 0, true, false, false)
    }

    public override onAllowAdd(attacker: ObjAIBase, type: BuffType, script: BuffScript, maxStack: int, result: AdditionResult){
        if (
            this.avatarVars.masteryJuggernaut
            && this.unit.team != attacker.team
            && [
                BuffType.SNARE,
                BuffType.SLOW,
                BuffType.FEAR,
                BuffType.CHARM,
                BuffType.SLEEP,
                BuffType.STUN,
                BuffType.TAUNT,
            ].includes(type)
        ){
            const cCreduction: float = 0.9
            result.duration *= cCreduction
        }
        return true
    }

    //public override onActivate(){
    //    const foritfyCheck1: Spell = API.getSlotSpell(this.unit, 0, SpellbookType.SPELLBOOK_SUMMONER, SpellSlotType.SpellSlots)
    //    const foritfyCheck2: Spell = API.getSlotSpell(this.unit, 1, SpellbookType.SPELLBOOK_SUMMONER, SpellSlotType.SpellSlots)
    //    if (API.hasScript(foritfyCheck1, SummonerFortify) || API.hasScript(foritfyCheck2, SummonerFortify)){
    //        API.spellBuffAdd(this.unit, this.unit, new FortifyCheck(), 1, 1, 25000, BuffAddType.REPLACE_EXISTING, BuffType.INTERNAL, 3, true, false, false)
    //    }
    //}
    
    public override onUpdateStats(){
        const healthPERC: float = API.getHealthPercent(this.unit, PARType.MANA)
        if (this.avatarVars.masteryInitiate && healthPERC > 0.7){
            API.incPercentMovementSpeedMod(this.unit, this.avatarVars.masteryInitiateAmt)
        }
    }

    //public override onUpdateActions(){
    //    if (API.executePeriodically(2, this.lastTimeExecuted, false)){
    //        if (this.avatarVars.masterySeigeCommander){
    //            for(const unit of API.getUnitsInArea(this.unit, this.unit.position, 900, SpellDataFlags.AffectEnemies | SpellDataFlags.AffectTurrets, undefined, true)){
    //                API.spellBuffAdd(this.unit, unit, new MasterySiegeCommanderDebuff(), 1, 1, 2, BuffAddType.REPLACE_EXISTING, BuffType.INTERNAL, 0, true, false, false)
    //            }
    //        }
    //    }
    //}

    public override onKill(target: AttackableUnit){
        if (this.avatarVars.masteryScholar && API.isObjectHero(target)){
            //if (API.getBuffCountFromCaster(this.unit, this.unit, OdinPlayerBuff) > 0){
            //    API.incExp(this.unit, 20)
            //} else {
                API.incExp(this.unit, 40)
            //}
        }
        if (this.avatarVars.masteryBounty && API.isObjectHero(target)){
            //if (API.getBuffCountFromCaster(this.unit, this.unit, OdinPlayerBuff) > 0){
            //    const masteryBountyAmt: float = this.avatarVars.masteryBountyAmt / 2
            //    API.incGold(this.unit, masteryBountyAmt)
            //} else {
                API.incGold(this.unit, this.avatarVars.masteryBountyAmt)
            //}
        }
    }

    public override onAssist(attacker: ObjAIBase, target: AttackableUnit){
        if (this.avatarVars.masteryScholar && API.isObjectHero(target)){
            // if (API.getBuffCountFromCaster(this.unit, this.unit, OdinPlayerBuff) > 0){
            //     API.incExp(this.unit, 20)
            // } else {
                API.incExp(this.unit, 40)
            // }
        }
        if (this.avatarVars.masteryBounty && API.isObjectHero(target)){
            // if (API.getBuffCountFromCaster(this.unit, this.unit, OdinPlayerBuff) > 0){
            //     const masteryBountyAmt: float = this.avatarVars.masteryBountyAmt / 2
            //     API.incGold(this.unit, masteryBountyAmt)
            // } else {
                API.incGold(this.unit, this.avatarVars.masteryBountyAmt)
            // }
        }
    }

    public override onHitUnit(target: AttackableUnit, damage: HitDamage){
        if(API.isTurretAI(target)){
            const abilityPower: float = API.getFlatMagicDamageMod(this.unit)
            const abilityDamageToAdd: float = abilityPower / 2.5
            const bonusAttackPower: float = API.getFlatPhysicalDamageMod(this.unit)
            if (bonusAttackPower <= abilityDamageToAdd){
                damage.amount -= bonusAttackPower
                damage.amount += abilityDamageToAdd
            }
            if (this.avatarVars.masteryDemolitionist){
                damage.amount += this.avatarVars.masteryDemolitionistAmt
            }
        } else if(API.isObjectAI(target)){
            const abilityPower: float = API.getFlatMagicDamageMod(this.unit)
            const abilityDamageToAdd: float = abilityPower / 2.5
            const bonusAttackPower: float = API.getFlatPhysicalDamageMod(this.unit)
            if (bonusAttackPower <= abilityDamageToAdd){
                damage.amount -= bonusAttackPower
                damage.amount += abilityDamageToAdd
            }
            if (this.avatarVars.masteryDemolitionist){
                damage.amount += this.avatarVars.masteryDemolitionistAmt
            }
        }
        if (this.avatarVars.masteryButcher && API.isObjectAI(target) && !API.isTurretAI(target) && !API.isObjectHero(target)){
            damage.amount += this.avatarVars.masteryButcherAmt
        }
    }

    public override onBeingHit(attacker: ObjAIBase, damage: HitDamage){
        if (this.avatarVars.masteryBladedArmor && API.isObjectAI(attacker) && !API.isTurretAI(attacker) && !API.isObjectHero(attacker)){
            API.applyDamage(this.unit, attacker, this.avatarVars.masteryBladedArmorAmt, DamageType.TRUE, DamageSource.REACTIVE, 1, 0, 0, false, false, this.unit)
        }
    }
}
