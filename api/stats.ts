import type { Unit } from "../ecf/unit";
import type { PARType } from "../ecf/systems/stats/shared";
import { Hero } from "../objects/hero";

//export namespace API {
export function incGold(unit: Unit, amount: number){ if(unit instanceof Hero) unit.stats.gold += amount }
export function incExp(unit: Unit, amount: number){ if(unit instanceof Hero) unit.stats.exp += amount }

export function getTotalAttackDamage(unit: Unit){ return unit.stats!.totalAttackDamage }
export function getBaseAttackDamage(unit: Unit){ return unit.stats!.baseAttackDamage }
export function getFlatPhysicalDamageMod(unit: Unit){ return unit.stats!.flatPhysicalDamageMod }
export function incFlatPhysicalDamageMod(unit: Unit, delta: number){ return unit.stats!.flatPhysicalDamageMod += delta }
export function incPermanentFlatPhysicalDamageMod(unit: Unit, delta: number){ return unit.stats!.permanentFlatPhysicalDamageMod += delta }
export function incPercentPhysicalDamageMod(unit: Unit, delta: number){ return unit.stats!.percentPhysicalDamageMod += delta }
export function incPermanentPercentPhysicalDamageMod(unit: Unit, delta: number){ return unit.stats!.permanentPercentPhysicalDamageMod += delta }
export function getDodge(unit: Unit){ return unit.stats!.dodge }
export function incFlatDodgeMod(unit: Unit, delta: number){ return unit.stats!.flatDodgeMod += delta }
export function incFlatMissChanceMod(unit: Unit, delta: number){ return unit.stats!.flatMissChanceMod += delta }
export function getFlatAttackRangeMod(unit: Unit){ return unit.stats!.flatAttackRangeMod }
export function incFlatAttackRangeMod(unit: Unit, delta: number){ return unit.stats!.flatAttackRangeMod += delta }
export function incPermanentFlatAttackRangeMod(unit: Unit, delta: number){ return unit.stats!.permanentFlatAttackRangeMod += delta }
export function incFlatBubbleRadiusMod(unit: Unit, delta: number){ return unit.stats!.flatBubbleRadiusMod += delta }
export function incPermanentFlatBubbleRadiusMod(unit: Unit, delta: number){ return unit.stats!.permanentFlatBubbleRadiusMod += delta }
export function incPercentBubbleRadiusMod(unit: Unit, delta: number){ return unit.stats!.percentBubbleRadiusMod += delta }
export function incPermanentPercentBubbleRadiusMod(unit: Unit, delta: number){ return unit.stats!.permanentPercentBubbleRadiusMod += delta }
export function incAcquisitionRangeMod(unit: Unit, delta: number){ return unit.stats!.acquisitionRangeMod += delta }
export function getFlatCritChanceMod(unit: Unit){ return unit.stats!.flatCritChanceMod }
export function incFlatCritChanceMod(unit: Unit, delta: number){ return unit.stats!.flatCritChanceMod += delta }
export function incPermanentFlatCritChanceMod(unit: Unit, delta: number){ return unit.stats!.permanentFlatCritChanceMod += delta }
export function getFlatCritDamageMod(unit: Unit){ return unit.stats!.flatCritDamageMod }
export function incFlatCritDamageMod(unit: Unit, delta: number){ return unit.stats!.flatCritDamageMod += delta }
export function incHealth(unit: Unit, delta: number, healer: Unit){ return unit.stats!.health += delta }
export function getHealth(unit: Unit, PARType: PARType = 0){ return unit.stats!.health }
export function getHealthPercent(unit: Unit, PARType: PARType = 0){ return unit.stats!.healthPercent }
export function incMaxHealth(unit: Unit, delta: number, incCurrentHealth: boolean){ return unit.stats!.maxHealth += delta }
export function getMaxHealth(unit: Unit, PARType: PARType = 0){ return unit.stats!.maxHealth }
export function getFlatHPPoolMod(unit: Unit){ return unit.stats!.flatHPPoolMod }
export function incFlatHPPoolMod(unit: Unit, delta: number){ return unit.stats!.flatHPPoolMod += delta }
export function incPermanentFlatHPPoolMod(unit: Unit, delta: number){ return unit.stats!.permanentFlatHPPoolMod += delta }
export function incPercentHPPoolMod(unit: Unit, delta: number){ return unit.stats!.percentHPPoolMod += delta }
export function incFlatHPRegenMod(unit: Unit, delta: number){ return unit.stats!.flatHPRegenMod += delta }
export function incPermanentFlatHPRegenMod(unit: Unit, delta: number){ return unit.stats!.permanentFlatHPRegenMod += delta }
export function incPercentHPRegenMod(unit: Unit, delta: number){ return unit.stats!.percentHPRegenMod += delta }
export function incPermanentPercentHPRegenMod(unit: Unit, delta: number){ return unit.stats!.permanentPercentHPRegenMod += delta }
export function incPAR(unit: Unit, delta: number, PARType: PARType = 0){ return unit.stats!.par += delta }
export function getPAR(unit: Unit, PARType: PARType = 0){ return unit.stats!.par }
export function getPARPercent(unit: Unit, PARType: PARType = 0){ return unit.stats!.parPercent }
export function getMaxPAR(unit: Unit, PARType: PARType = 0){ return unit.stats!.maxPAR }
export function incFlatPARPoolMod(unit: Unit, delta: number, PARType: PARType = 0){ return unit.stats!.flatPARPoolMod += delta }
export function incPermanentFlatPARPoolMod(unit: Unit, delta: number, PARType: PARType = 0){ return unit.stats!.permanentFlatPARPoolMod += delta }
export function incPercentPARPoolMod(unit: Unit, delta: number, PARType: PARType = 0){ return unit.stats!.percentPARPoolMod += delta }
export function incFlatPARRegenMod(unit: Unit, delta: number, PARType: PARType = 0){ return unit.stats!.flatPARRegenMod += delta }
export function incPermanentFlatPARRegenMod(unit: Unit, delta: number, PARType: PARType = 0){ return unit.stats!.permanentFlatPARRegenMod += delta }
export function incPercentPARRegenMod(unit: Unit, delta: number, PARType: PARType = 0){ return unit.stats!.percentPARRegenMod += delta }
export function getFlatMagicDamageMod(unit: Unit){ return unit.stats!.flatMagicDamageMod }
export function incFlatMagicDamageMod(unit: Unit, delta: number){ return unit.stats!.flatMagicDamageMod += delta }
export function incPermanentFlatMagicDamageMod(unit: Unit, delta: number){ return unit.stats!.permanentFlatMagicDamageMod += delta }
export function incPercentMagicDamageMod(unit: Unit, delta: number){ return unit.stats!.percentMagicDamageMod += delta }
export function getMovementSpeed(unit: Unit){ return unit.stats!.movementSpeed }
export function getFlatMovementSpeedMod(unit: Unit){ return unit.stats!.flatMovementSpeedMod }
export function incFlatMovementSpeedMod(unit: Unit, delta: number){ return unit.stats!.flatMovementSpeedMod += delta }
export function incPermanentFlatMovementSpeedMod(unit: Unit, delta: number){ return unit.stats!.permanentFlatMovementSpeedMod += delta }
export function incPercentMovementSpeedMod(unit: Unit, delta: number){ return unit.stats!.percentMovementSpeedMod += delta }
export function incPermanentPercentMovementSpeedMod(unit: Unit, delta: number){ return unit.stats!.permanentPercentMovementSpeedMod += delta }
export function incPercentMultiplicativeMovementSpeedMod(unit: Unit, delta: number){ return unit.stats!.percentMultiplicativeMovementSpeedMod += delta }
export function incMoveSpeedFloorMod(unit: Unit, delta: number){ return unit.stats!.moveSpeedFloorMod += delta }
export function getPercentAttackSpeedMod(unit: Unit){ return unit.stats!.percentAttackSpeedMod }
export function incPercentAttackSpeedMod(unit: Unit, delta: number){ return unit.stats!.percentAttackSpeedMod += delta }
export function incPermanentPercentAttackSpeedMod(unit: Unit, delta: number){ return unit.stats!.permanentPercentAttackSpeedMod += delta }
export function incPercentMultiplicativeAttackSpeedMod(unit: Unit, delta: number){ return unit.stats!.percentMultiplicativeAttackSpeedMod += delta }
export function getPercentCooldownMod(unit: Unit){ return unit.stats!.percentCooldownMod }
export function incPercentCooldownMod(unit: Unit, delta: number){ return unit.stats!.percentCooldownMod += delta }
export function incPermanentPercentCooldownMod(unit: Unit, delta: number){ return unit.stats!.permanentPercentCooldownMod += delta }
export function getPercentHardnessMod(unit: Unit){ return unit.stats!.percentHardnessMod }
export function getPercentLifeStealMod(unit: Unit){ return unit.stats!.percentLifeStealMod }
export function incPercentLifeStealMod(unit: Unit, delta: number){ return unit.stats!.percentLifeStealMod += delta }
export function getPercentRespawnTimeMod(unit: Unit){ return unit.stats!.percentRespawnTimeMod }
export function incPercentRespawnTimeMod(unit: Unit, delta: number){ return unit.stats!.percentRespawnTimeMod += delta }
export function getArmor(unit: Unit){ return unit.stats!.armor }
export function incFlatArmorMod(unit: Unit, delta: number){ return unit.stats!.flatArmorMod += delta }
export function incPermanentFlatArmorMod(unit: Unit, delta: number){ return unit.stats!.permanentFlatArmorMod += delta }
export function incPercentArmorMod(unit: Unit, delta: number){ return unit.stats!.percentArmorMod += delta }
export function incFlatArmorPenetrationMod(unit: Unit, delta: number){ return unit.stats!.flatArmorPenetrationMod += delta }
export function incPermanentFlatArmorPenetrationMod(unit: Unit, delta: number){ return unit.stats!.permanentFlatArmorPenetrationMod += delta }
export function incPercentArmorPenetrationMod(unit: Unit, delta: number){ return unit.stats!.percentArmorPenetrationMod += delta }
export function incFlatPhysicalReduction(unit: Unit, delta: number){ return unit.stats!.flatPhysicalReduction += delta }
export function incPercentPhysicalReduction(unit: Unit, delta: number){ return unit.stats!.percentPhysicalReduction += delta }
export function incFlatSpellBlockMod(unit: Unit, delta: number){ return unit.stats!.flatSpellBlockMod += delta }
export function incPermanentFlatSpellBlockMod(unit: Unit, delta: number){ return unit.stats!.permanentFlatSpellBlockMod += delta }
export function getPercentSpellBlockMod(unit: Unit){ return unit.stats!.percentSpellBlockMod }
export function incPercentSpellBlockMod(unit: Unit, delta: number){ return unit.stats!.percentSpellBlockMod += delta }
export function incFlatMagicPenetrationMod(unit: Unit, delta: number){ return unit.stats!.flatMagicPenetrationMod += delta }
export function incPercentMagicPenetrationMod(unit: Unit, delta: number){ return unit.stats!.percentMagicPenetrationMod += delta }
export function incFlatMagicReduction(unit: Unit, delta: number){ return unit.stats!.flatMagicReduction += delta }
export function incPercentMagicReduction(unit: Unit, delta: number){ return unit.stats!.percentMagicReduction += delta }
export function getPercentSpellVampMod(unit: Unit){ return unit.stats!.percentSpellVampMod }
export function incPercentSpellVampMod(unit: Unit, delta: number){ return unit.stats!.percentSpellVampMod += delta }
export function incFlatGoldPer10Mod(unit: Unit, delta: number){ return unit.stats!.flatGoldPer10Mod += delta }
export function incPermanentFlatGoldPer10Mod(unit: Unit, delta: number){ return unit.stats!.permanentFlatGoldPer10Mod += delta }
export function incPermanentGoldReward(unit: Unit, delta: number){ return unit.stats!.permanentGoldReward += delta }
export function incPermanentExpReward(unit: Unit, delta: number){ return unit.stats!.permanentExpReward += delta }
export function incPercentEXPBonus(unit: Unit, delta: number){ return unit.stats!.percentEXPBonus += delta }
export function incPermanentPercentEXPBonus(unit: Unit, delta: number){ return unit.stats!.permanentPercentEXPBonus += delta }
export function incScaleSkinCoef(unit: Unit, delta: number){ return unit.stats!.scaleSkinCoef += delta }
//}