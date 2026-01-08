import type { Unit } from "../ecf/unit";
import type { PARType } from "../ecf/systems/stats/shared";

namespace API {
    function getTotalAttackDamage(unit: Unit){ return unit.stats!.totalAttackDamage }
    function getBaseAttackDamage(unit: Unit){ return unit.stats!.baseAttackDamage }
    function getFlatPhysicalDamageMod(unit: Unit){ return unit.stats!.flatPhysicalDamageMod }
    function incFlatPhysicalDamageMod(unit: Unit, delta: number){ return unit.stats!.flatPhysicalDamageMod += delta }
    function incPermanentFlatPhysicalDamageMod(unit: Unit, delta: number){ return unit.stats!.permanentFlatPhysicalDamageMod += delta }
    function incPercentPhysicalDamageMod(unit: Unit, delta: number){ return unit.stats!.percentPhysicalDamageMod += delta }
    function incPermanentPercentPhysicalDamageMod(unit: Unit, delta: number){ return unit.stats!.permanentPercentPhysicalDamageMod += delta }
    function getDodge(unit: Unit){ return unit.stats!.dodge }
    function incFlatDodgeMod(unit: Unit, delta: number){ return unit.stats!.flatDodgeMod += delta }
    function incFlatMissChanceMod(unit: Unit, delta: number){ return unit.stats!.flatMissChanceMod += delta }
    function getFlatAttackRangeMod(unit: Unit){ return unit.stats!.flatAttackRangeMod }
    function incFlatAttackRangeMod(unit: Unit, delta: number){ return unit.stats!.flatAttackRangeMod += delta }
    function incPermanentFlatAttackRangeMod(unit: Unit, delta: number){ return unit.stats!.permanentFlatAttackRangeMod += delta }
    function incFlatBubbleRadiusMod(unit: Unit, delta: number){ return unit.stats!.flatBubbleRadiusMod += delta }
    function incPermanentFlatBubbleRadiusMod(unit: Unit, delta: number){ return unit.stats!.permanentFlatBubbleRadiusMod += delta }
    function incPercentBubbleRadiusMod(unit: Unit, delta: number){ return unit.stats!.percentBubbleRadiusMod += delta }
    function incPermanentPercentBubbleRadiusMod(unit: Unit, delta: number){ return unit.stats!.permanentPercentBubbleRadiusMod += delta }
    function incAcquisitionRangeMod(unit: Unit, delta: number){ return unit.stats!.acquisitionRangeMod += delta }
    function getFlatCritChanceMod(unit: Unit){ return unit.stats!.flatCritChanceMod }
    function incFlatCritChanceMod(unit: Unit, delta: number){ return unit.stats!.flatCritChanceMod += delta }
    function incPermanentFlatCritChanceMod(unit: Unit, delta: number){ return unit.stats!.permanentFlatCritChanceMod += delta }
    function getFlatCritDamageMod(unit: Unit){ return unit.stats!.flatCritDamageMod }
    function incFlatCritDamageMod(unit: Unit, delta: number){ return unit.stats!.flatCritDamageMod += delta }
    function incHealth(unit: Unit, delta: number, healer: Unit){ return unit.stats!.health += delta }
    function getHealth(unit: Unit, PARType: PARType = 0){ return unit.stats!.health }
    function getHealthPercent(unit: Unit, PARType: PARType = 0){ return unit.stats!.healthPercent }
    function incMaxHealth(unit: Unit, delta: number, incCurrentHealth: boolean){ return unit.stats!.maxHealth += delta }
    function getMaxHealth(unit: Unit, PARType: PARType = 0){ return unit.stats!.maxHealth }
    function getFlatHPPoolMod(unit: Unit){ return unit.stats!.flatHPPoolMod }
    function incFlatHPPoolMod(unit: Unit, delta: number){ return unit.stats!.flatHPPoolMod += delta }
    function incPermanentFlatHPPoolMod(unit: Unit, delta: number){ return unit.stats!.permanentFlatHPPoolMod += delta }
    function incPercentHPPoolMod(unit: Unit, delta: number){ return unit.stats!.percentHPPoolMod += delta }
    function incFlatHPRegenMod(unit: Unit, delta: number){ return unit.stats!.flatHPRegenMod += delta }
    function incPermanentFlatHPRegenMod(unit: Unit, delta: number){ return unit.stats!.permanentFlatHPRegenMod += delta }
    function incPercentHPRegenMod(unit: Unit, delta: number){ return unit.stats!.percentHPRegenMod += delta }
    function incPermanentPercentHPRegenMod(unit: Unit, delta: number){ return unit.stats!.permanentPercentHPRegenMod += delta }
    function incPAR(unit: Unit, delta: number, PARType: PARType = 0){ return unit.stats!.par += delta }
    function getPAR(unit: Unit, PARType: PARType = 0){ return unit.stats!.par }
    function getPARPercent(unit: Unit, PARType: PARType = 0){ return unit.stats!.parPercent }
    function getMaxPAR(unit: Unit, PARType: PARType = 0){ return unit.stats!.maxPAR }
    function incFlatPARPoolMod(unit: Unit, delta: number, PARType: PARType = 0){ return unit.stats!.flatPARPoolMod += delta }
    function incPermanentFlatPARPoolMod(unit: Unit, delta: number, PARType: PARType = 0){ return unit.stats!.permanentFlatPARPoolMod += delta }
    function incPercentPARPoolMod(unit: Unit, delta: number, PARType: PARType = 0){ return unit.stats!.percentPARPoolMod += delta }
    function incFlatPARRegenMod(unit: Unit, delta: number, PARType: PARType = 0){ return unit.stats!.flatPARRegenMod += delta }
    function incPermanentFlatPARRegenMod(unit: Unit, delta: number, PARType: PARType = 0){ return unit.stats!.permanentFlatPARRegenMod += delta }
    function incPercentPARRegenMod(unit: Unit, delta: number, PARType: PARType = 0){ return unit.stats!.percentPARRegenMod += delta }
    function getFlatMagicDamageMod(unit: Unit){ return unit.stats!.flatMagicDamageMod }
    function incFlatMagicDamageMod(unit: Unit, delta: number){ return unit.stats!.flatMagicDamageMod += delta }
    function incPermanentFlatMagicDamageMod(unit: Unit, delta: number){ return unit.stats!.permanentFlatMagicDamageMod += delta }
    function incPercentMagicDamageMod(unit: Unit, delta: number){ return unit.stats!.percentMagicDamageMod += delta }
    function getMovementSpeed(unit: Unit){ return unit.stats!.movementSpeed }
    function getFlatMovementSpeedMod(unit: Unit){ return unit.stats!.flatMovementSpeedMod }
    function incFlatMovementSpeedMod(unit: Unit, delta: number){ return unit.stats!.flatMovementSpeedMod += delta }
    function incPermanentFlatMovementSpeedMod(unit: Unit, delta: number){ return unit.stats!.permanentFlatMovementSpeedMod += delta }
    function incPercentMovementSpeedMod(unit: Unit, delta: number){ return unit.stats!.percentMovementSpeedMod += delta }
    function incPermanentPercentMovementSpeedMod(unit: Unit, delta: number){ return unit.stats!.permanentPercentMovementSpeedMod += delta }
    function incPercentMultiplicativeMovementSpeedMod(unit: Unit, delta: number){ return unit.stats!.percentMultiplicativeMovementSpeedMod += delta }
    function incMoveSpeedFloorMod(unit: Unit, delta: number){ return unit.stats!.moveSpeedFloorMod += delta }
    function getPercentAttackSpeedMod(unit: Unit){ return unit.stats!.percentAttackSpeedMod }
    function incPercentAttackSpeedMod(unit: Unit, delta: number){ return unit.stats!.percentAttackSpeedMod += delta }
    function incPermanentPercentAttackSpeedMod(unit: Unit, delta: number){ return unit.stats!.permanentPercentAttackSpeedMod += delta }
    function incPercentMultiplicativeAttackSpeedMod(unit: Unit, delta: number){ return unit.stats!.percentMultiplicativeAttackSpeedMod += delta }
    function getPercentCooldownMod(unit: Unit){ return unit.stats!.percentCooldownMod }
    function incPercentCooldownMod(unit: Unit, delta: number){ return unit.stats!.percentCooldownMod += delta }
    function incPermanentPercentCooldownMod(unit: Unit, delta: number){ return unit.stats!.permanentPercentCooldownMod += delta }
    function getPercentHardnessMod(unit: Unit){ return unit.stats!.percentHardnessMod }
    function getPercentLifeStealMod(unit: Unit){ return unit.stats!.percentLifeStealMod }
    function incPercentLifeStealMod(unit: Unit, delta: number){ return unit.stats!.percentLifeStealMod += delta }
    function getPercentRespawnTimeMod(unit: Unit){ return unit.stats!.percentRespawnTimeMod }
    function incPercentRespawnTimeMod(unit: Unit, delta: number){ return unit.stats!.percentRespawnTimeMod += delta }
    function getArmor(unit: Unit){ return unit.stats!.armor }
    function incFlatArmorMod(unit: Unit, delta: number){ return unit.stats!.flatArmorMod += delta }
    function incPermanentFlatArmorMod(unit: Unit, delta: number){ return unit.stats!.permanentFlatArmorMod += delta }
    function incPercentArmorMod(unit: Unit, delta: number){ return unit.stats!.percentArmorMod += delta }
    function incFlatArmorPenetrationMod(unit: Unit, delta: number){ return unit.stats!.flatArmorPenetrationMod += delta }
    function incPermanentFlatArmorPenetrationMod(unit: Unit, delta: number){ return unit.stats!.permanentFlatArmorPenetrationMod += delta }
    function incPercentArmorPenetrationMod(unit: Unit, delta: number){ return unit.stats!.percentArmorPenetrationMod += delta }
    function incFlatPhysicalReduction(unit: Unit, delta: number){ return unit.stats!.flatPhysicalReduction += delta }
    function incPercentPhysicalReduction(unit: Unit, delta: number){ return unit.stats!.percentPhysicalReduction += delta }
    function incFlatSpellBlockMod(unit: Unit, delta: number){ return unit.stats!.flatSpellBlockMod += delta }
    function incPermanentFlatSpellBlockMod(unit: Unit, delta: number){ return unit.stats!.permanentFlatSpellBlockMod += delta }
    function getPercentSpellBlockMod(unit: Unit){ return unit.stats!.percentSpellBlockMod }
    function incPercentSpellBlockMod(unit: Unit, delta: number){ return unit.stats!.percentSpellBlockMod += delta }
    function incFlatMagicPenetrationMod(unit: Unit, delta: number){ return unit.stats!.flatMagicPenetrationMod += delta }
    function incPercentMagicPenetrationMod(unit: Unit, delta: number){ return unit.stats!.percentMagicPenetrationMod += delta }
    function incFlatMagicReduction(unit: Unit, delta: number){ return unit.stats!.flatMagicReduction += delta }
    function incPercentMagicReduction(unit: Unit, delta: number){ return unit.stats!.percentMagicReduction += delta }
    function getPercentSpellVampMod(unit: Unit){ return unit.stats!.percentSpellVampMod }
    function incPercentSpellVampMod(unit: Unit, delta: number){ return unit.stats!.percentSpellVampMod += delta }
    function incFlatGoldPer10Mod(unit: Unit, delta: number){ return unit.stats!.flatGoldPer10Mod += delta }
    function incPermanentFlatGoldPer10Mod(unit: Unit, delta: number){ return unit.stats!.permanentFlatGoldPer10Mod += delta }
    function incPermanentGoldReward(unit: Unit, delta: number){ return unit.stats!.permanentGoldReward += delta }
    function incPermanentExpReward(unit: Unit, delta: number){ return unit.stats!.permanentExpReward += delta }
    function incPercentEXPBonus(unit: Unit, delta: number){ return unit.stats!.percentEXPBonus += delta }
    function incPermanentPercentEXPBonus(unit: Unit, delta: number){ return unit.stats!.permanentPercentEXPBonus += delta }
    function incScaleSkinCoef(unit: Unit, delta: number){ return unit.stats!.scaleSkinCoef += delta }
}