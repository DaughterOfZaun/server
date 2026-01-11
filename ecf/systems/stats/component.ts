import { float32ToUInt32 } from "../../../math";
import { Component } from "../../component";
import type { CharacterData } from "../data/data";

export abstract class StatsComponent extends Component {

    level: number = 1

    baseAttackDamage: number = 0
    attackDamagePerLevel: number = 0
    totalAttackDamage: number = 0
    flatPhysicalDamageMod: number = 0
    permanentFlatPhysicalDamageMod: number = 0
    percentPhysicalDamageMod: number = 0
    permanentPercentPhysicalDamageMod: number = 0
    
    dodge: number = 0
    baseDodge: number = 0
    dodgePerLevel: number = 0
    flatDodgeMod: number = 0

    flatMissChanceMod: number = 0
    
    baseAttackRange: number = 0
    flatAttackRangeMod: number = 0
    permanentFlatAttackRangeMod: number = 0
    get attackRange(): number {
        return (
            this.baseAttackRange +
            this.flatAttackRangeMod + this.permanentFlatAttackRangeMod
        )
    }
    
    flatBubbleRadiusMod: number = 0
    permanentFlatBubbleRadiusMod: number = 0
    percentBubbleRadiusMod: number = 0
    permanentPercentBubbleRadiusMod: number = 0
    
    acquisitionRangeMod: number = 0
    
    crit: number = 0
    baseCritChance: number = 0
    critChancePerLevel: number = 0
    flatCritChanceMod: number = 0
    permanentFlatCritChanceMod: number = 0
    flatCritDamageMod: number = 0
    critDamageMultiplier: number = 0
    
    health: number = 0
    get healthPercent(): number {
        return this.health / this.maxHealth
    }
    
    baseHealth: number = 0
    healthPerLevel: number = 0
    flatHPPoolMod: number = 0
    permanentFlatHPPoolMod: number = 0
    percentHPPoolMod: number = 0
    get maxHealth(): number {
        return (
            this.baseHealth + this.healthPerLevel * this.level +
            this.flatHPPoolMod + this.permanentFlatHPPoolMod
        ) * (1 + this.percentHPPoolMod)
    }
    
    hpRegenRate: number = 0
    flatHPRegenMod: number = 0
    permanentFlatHPRegenMod: number = 0
    percentHPRegenMod: number = 0
    permanentPercentHPRegenMod: number = 0
    
    par: number = 0
    parPercent: number = 0
    
    maxPAR: number = 0
    basePAR: number = 0
    parPerLevel: number = 0
    flatPARPoolMod: number = 0
    permanentFlatPARPoolMod: number = 0
    percentPARPoolMod: number = 0
    
    parRegenRate: number = 0
    flatPARRegenMod: number = 0
    permanentFlatPARRegenMod: number = 0
    percentPARRegenMod: number = 0

    baseAbilityDamage: number = 0
    magicDamagePerLevel: number = 0
    flatMagicDamageMod: number = 0
    permanentFlatMagicDamageMod: number = 0
    percentMagicDamageMod: number = 0
    
    baseMoveSpeed: number = 0
    flatMovementSpeedMod: number = 0
    permanentFlatMovementSpeedMod: number = 0
    percentMovementSpeedMod: number = 0
    permanentPercentMovementSpeedMod: number = 0
    percentMultiplicativeMovementSpeedMod: number = 0
    moveSpeedFloorMod: number = 0
    get movementSpeed(): number {
        return (
            this.baseMoveSpeed +
            this.flatMovementSpeedMod + this.permanentFlatMovementSpeedMod
        ) * (1 + this.percentMovementSpeedMod + this.permanentPercentMovementSpeedMod)
          * (1 + this.percentMultiplicativeMovementSpeedMod)
    }
    
    attackSpeed: number = 0
    baseAttackSpeed: number = 0
    attackSpeedPerLevel: number = 0
    attackSpeedMod: number = 0
    percentAttackSpeedMod: number = 0
    permanentPercentAttackSpeedMod: number = 0
    percentMultiplicativeAttackSpeedMod: number = 0
    
    percentCooldownMod: number = 0
    permanentPercentCooldownMod: number = 0
    
    percentHardnessMod: number = 0
    
    percentLifeStealMod: number = 0
    
    percentRespawnTimeMod: number = 0
    
    get armor(){
        return (
            this.baseArmor + this.armorPerLevel * this.level + 
            this.flatArmorMod + this.permanentFlatArmorMod
        ) * (1 + this.percentArmorMod)
    }
    baseArmor: number = 0
    armorPerLevel: number = 0
    flatArmorMod: number = 0
    permanentFlatArmorMod: number = 0
    percentArmorMod: number = 0

    flatArmorPenetrationMod: number = 0
    permanentFlatArmorPenetrationMod: number = 0
    percentArmorPenetrationMod: number = 0
    
    flatPhysicalReduction: number = 0
    percentPhysicalReduction: number = 0

    spellBlock: number = 0
    baseSpellBlock: number = 0
    spellBlockPerLevel: number = 0
    flatSpellBlockMod: number = 0
    permanentFlatSpellBlockMod: number = 0
    percentSpellBlockMod: number = 0
    
    flatMagicPenetrationMod: number = 0
    percentMagicPenetrationMod: number = 0
    flatMagicReduction: number = 0
    percentMagicReduction: number = 0
    percentSpellVampMod: number = 0
    
    flatGoldPer10Mod: number = 0
    permanentFlatGoldPer10Mod: number = 0
    permanentGoldReward: number = 0
    permanentExpReward: number = 0
    percentEXPBonus: number = 0
    permanentPercentEXPBonus: number = 0

    scaleSkinCoef: number = 0

    private lastPrimaryID = -1
    private lastSecondaryIndex = -1
    public values: number[] = [ 0 ]
    public skip: boolean[] = [ true ]
    private i: number = 0

    public update(){
        this.lastPrimaryID = -1
        this.lastSecondaryIndex = -1
        this.skip[0] = true
        this.values[0] = 0
        this.i = 1

        this.write()

        if(!this.skip[0]){
            //console.log(this.skip.map((skip, i) => [ skip, this.values[i] ]))
            console.log(this.values)
            console.log(this.skip)
        }
    }

    public abstract write(): void

    protected setPrimaryID(primaryID: number){
        
        this.lastPrimaryID = primaryID

        const i = this.i++
        this.lastSecondaryIndex = i
        this.skip[i] = true
        this.values[i] = 0
    }

    protected writeUInt(secondaryId: number, value: number){
        this.writeValue(secondaryId, value)
    }
    protected writeBool(secondaryId: number, value: boolean){
        this.writeValue(secondaryId, +value)
    }
    protected writeFloat(secondaryId: number, digits: number, value: number){
        this.writeValue(secondaryId, float32ToUInt32(Math.round(value * (10 ** digits)) / (10 ** digits)))
    }

    private writeValue(secondaryId: number, value: number){

        const i = this.i++
        const skip = this.values[i] == value
        this.values[i] = value
        this.skip[i] = skip
        
        if(!skip){
            this.values[0]! |= 1 << this.lastPrimaryID
            this.skip[0] = false

            const i = this.lastSecondaryIndex
            this.values[i]! |= 1 << secondaryId
            this.values[i]! >>>= 0
            this.skip[i] = false
        }
    }

    load(data: CharacterData) {

        this.baseAttackRange = data.attackRange!

        this.baseArmor = data.armor!
        this.armorPerLevel = data.armorPerLevel!

        this.baseSpellBlock = data.spellBlock!
        this.spellBlockPerLevel = data.spellBlockPerLevel!

        this.baseDodge = data.baseDodge!
        this.dodgePerLevel = data.levelDodge!

        this.baseAttackSpeed = data.attackSpeed!
        this.attackSpeedPerLevel = data.attackSpeedPerLevel!

        this.baseAttackDamage = data.baseDamage!
        this.attackDamagePerLevel = data.damagePerLevel!

        this.baseCritChance = data.baseCritChance!
        this.critChancePerLevel = data.critPerLevel!
        this.critDamageMultiplier = data.critDamageBonus!

        this.baseAbilityDamage = data.baseAbilityPower ?? 0
        this.magicDamagePerLevel = data.abilityPowerIncPerLevel ?? 0
        
        this.baseHealth = data.baseHp!
        this.healthPerLevel = data.hpPerLevel!

        //TODO: this.healthRegen = data.staticHpRegen!
        //TODO: this.healthRegenPerLevel = data.hpRegenPerLevel!
        
        this.basePAR = data.baseMp!
        this.parPerLevel = data.mpPerLevel!

        //TODO: this.manaRegen = data.staticMpRegen!
        //TODO: this.manaRegenPerLevel = data.mpRegenPerLevel!
        
        this.baseMoveSpeed = data.moveSpeed!
        
        //TODO: this.spellEffectiveness = data.spellEffectiveness!
        //TODO: this.levelSpellEffectiveness = data.levelSpellEffectiveness!

        //TODO: this.factorHpRegen = data.factorHpRegen!
        //TODO: this.factorMpRegen = data.factorMpRegen!
    }
}
