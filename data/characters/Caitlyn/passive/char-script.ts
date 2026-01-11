import { CharScript, type HitDamage, type float, type int, type Spell, type Unit } from '../../../../api'
import { BuffAddType, BuffType, HitResult, SpellbookType, SpellSlotType } from '../../../../api'
import * as API from '../../../../api'

import { CaitlynHeadshot } from './headshot'
import { CaitlynHeadshotCount } from './headshot-count'
import { CaitlynHeadshotPassive } from './headshot-passive'
import { IfHasBuffCheck } from '../../../buffs/if-has-buff-check'
import { CaitlynPiltoverPeacemaker } from '../q/piltover-peacemaker'
import { CantAttack } from '../../../buffs/cant-attack'
import { APBonusDamageToTowers } from '../../../buffs/ap-bonus-damage-to-towers'
import { ChampionChampionDelta } from '../../../buffs/champion-champion-delta'

//export namespace CharScripts {
export class CharScriptCaitlyn extends CharScript {

    effect0: int[] = [ 8, 8, 8, 8, 8, 8, 7, 7, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6 ]
    effect1: int[] = [ 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4 ]
    
    public override onUpdateActions(){
        const bonusAD: float = API.getFlatPhysicalDamageMod(this.unit) * 2
        API.setSpellToolTipVar(bonusAD, 1, 3, SpellSlotType.SpellSlots, SpellbookType.SPELLBOOK_CHAMPION, this.unit)
    }
    
    public override setVarsByLevel(){
        this.charVars.tooltipAmount = this.effect0[this.level - 1]!
    }
    
    public override onHitUnit(target: Unit, damage: HitDamage){
        if(API.getBuffCountFromCaster(this.unit, this.unit, IfHasBuffCheck) == 0 && damage.hitResult != HitResult.Dodge){
            if(API.getBuffCountFromCaster(this.unit, this.unit, CaitlynHeadshot) == 0){
                if(API.isInBrush(this.unit)){
                    API.spellBuffAdd(this.unit, this.unit, new CaitlynHeadshotCount(), 8, 2, 25000, BuffAddType.STACKS_AND_RENEWS, BuffType.COMBAT_ENCHANCER, 0, true, false, false)
                } else {
                    API.spellBuffAdd(this.unit, this.unit, new CaitlynHeadshotCount(), 8, 1, 25000, BuffAddType.STACKS_AND_RENEWS, BuffType.COMBAT_ENCHANCER, 0, true, false, false)
                }
            } else if(API.isObjectAI(target) && !API.isTurretAI(target)){
                API.removeOverrideAutoAttack(this.unit, false)
            }
        }
    }
    
    public override onPreAttack(target: Unit){
        const level: int = API.getLevel(this.unit)
        const brushCount: int = this.effect1[level - 1]!
        if(API.isInBrush(this.unit)){
            const count: int = API.getBuffCountFromCaster(this.unit, this.unit, CaitlynHeadshotCount)
            if(count >= brushCount){
                API.spellBuffAdd(this.unit, this.unit, new CaitlynHeadshot(), 1, 1, 25000, BuffAddType.REPLACE_EXISTING, BuffType.COMBAT_ENCHANCER, 0, true, false, false)
                API.spellBuffRemoveStacks(this.unit, this.unit, CaitlynHeadshotCount, 0)
            }
        }
    }
    
    public override onSpellCast(spell: Spell){
        if(API.hasScript(spell, CaitlynPiltoverPeacemaker)){
            this.charVars.percentOfAttack = 1
            API.spellBuffAdd(this.unit, this.unit, new CantAttack(), 1, 1, 0.75, BuffAddType.REPLACE_EXISTING, BuffType.INTERNAL, 0, true, false, false)
        }
    }

    public override onActivate(){
        API.spellBuffAdd(this.unit, this.unit, new APBonusDamageToTowers(), 1, 1, 25000, BuffAddType.RENEW_EXISTING, BuffType.INTERNAL, 0, true, false, false)
        API.spellBuffAdd(this.unit, this.unit, new ChampionChampionDelta(), 1, 1, 25000, BuffAddType.REPLACE_EXISTING, BuffType.INTERNAL, 0, true, false, false)
        API.spellBuffAdd(this.unit, this.unit, new CaitlynHeadshotPassive(), 1, 1, 25000, BuffAddType.REPLACE_EXISTING, BuffType.AURA, 0, true, false, false)
    }

    public override onDisconnect(){
        API.spellCast(this.unit, this.unit, this.unit.position, this.unit.position, 6, SpellSlotType.InventorySlots, 1, true, false, false, false, false, false)
    }

    public override preload(){
        API.preloadSpell("ifhasbuffcheck")
        API.preloadSpell("caitlynheadshot")
        API.preloadSpell("caitlynheadshotcount")
        API.preloadSpell("cantattack")
        API.preloadSpell("apbonusdamagetotowers")
        API.preloadSpell("championchampiondelta")
        API.preloadSpell("caitlynheadshotpassive")
    }
}
//}