//export * from './index'
export * from './enums'
export * from './stats'
export * from './status'

import type { Unit } from "../ecf/unit";
import { Vector3 } from "../math";
export type { Unit }

import type { float, int, bool } from '../utils'
export type { float, int, bool }

export      { CharScript } from '../ecf/systems/passive/script'

import type { BuffScript } from "../ecf/systems/buffs/script"
export      { BuffScript, BuffScriptMetadata } from "../ecf/systems/buffs/script"

import type { SpellScript } from '../ecf/systems/spells/script';
export      { SpellScript, SpellScriptMetadata } from '../ecf/systems/spells/script';

import type { Spell } from '../ecf/systems/spells/component';
export type { Spell }

import { BuffAddType, BuffType, FXFlags, OrderType, SpawnType, TeamId } from "./enums";
import { type DamageSource, type DamageType, type HitResult} from "./enums";
import { type SpellbookType, type SpellSlotType, type SpellDataFlags } from "./enums";

export type Champion = Unit
export type Minion = Unit
export type Missile = Unit
export type Particle = Unit
export type AttackableUnit = Unit
export type ObjAIBase = Unit
export type ObjBuilding = Unit
export type GameObject = Unit
export type SpellMissile = Unit

export interface Damage {
    amount: float
    type: DamageType
    source: DamageSource
}

export interface HitDamage extends Damage {
    hitResult: HitResult
}

export interface DeathResult {
    becomeZombie: bool
}

export class LastTimeExecuted {
    trackTime: float = 0
}

export interface ExecutionResult {
    hitResult: HitResult
}

export interface AdditionResult {
    duration: float
}

//export namespace API {
//TODO: export function getPointByUnitFacingOffset(unit: Unit, distance: float, offsetAngle: float): Vector3 { return Vector3.Zero }
//TODO: export function getPointByUnitFacingOffsetposition(unit: Unit, spellposition: Vector3, distance: float, offsetAngle: float): Vector3 { return Vector3.Zero }
//TODO: export function distanceBetweenPoints(point1: Vector3, point2: Vector3): float { return 0 }
//TODO: export function getTime(): float { return 0 }
export function getGameTime(): float {
    console.log(`Method is not implemented: ${ arguments.callee.name }`)
    return 0
}
export function spawnMinion(name: string, skin: string, aiScript: string | undefined, pos: Vector3, team: TeamId, stunned: bool, rooted: bool, silenced: bool, invulnerable: bool, magicImmune: bool, ignoreCollision: bool, visibilitySize: float, isWard: bool = false, placemarker: bool = false, goldRedirectTarget?: Champion, hasbt: bool = false): Minion {
    console.log(`Method is not implemented: ${ arguments.callee.name }`)
    return undefined!
}
//TODO: export function addBuff(attacker?: Unit, target: Unit, buffScript: BuffScript, maxStack: int = 1, numberOfStacks: int = 1, duration: float = 25000, buffAddType: BuffAddType = BuffAddType.REPLACE_EXISTING, buffType: BuffType = BuffType.Internal, tickRate: float = 0, stacksExclusive: bool = false, canMitigateDuration: bool = false, isHiddenOnClient: bool = false, originSpell?: Spell): void {}
//TODO: export function spellBuffRemoveCurrent(target: Unit): void {}
export function spellBuffRemove(target: Unit, buff: typeof BuffScript, attacker?: Unit, resetDuration: float = 0): void {
    console.log(`Method is not implemented: ${ arguments.callee.name }`)
}
export function preloadParticle(name: string): void {}
export function preloadSpell(name: string): void {}
export function preloadCharacter(name: string): void {}
//TODO: export function setSlotSpellCooldownTime(owner: Unit, spellSlot: int, spellbookType: SpellbookType, slotType: SpellSlotType = SpellSlotType.SpellSlots, src: float = 0): void {}
//TODO: export function getUnitPosition(unit?: Unit): Vector3 { return Vector3.Zero }
//TODO: export function spellBuffCount(owner: Unit, buff: typeof BuffScript, attacker?: ObjAIBase): int { return 0 }
export function getTeamID(target: Unit): TeamId {
    return target.team
}
//TODO: export function move(unit: Unit, target: Vector3, speed: float, gravity: float = 0, moveBackBy: float = 0, movementType: ForceMovementType = 0, movementOrdersType: ForceMovementOrdersType = 0, idealDistance: float = 0, movementOrdersFacing: ForceMovementOrdersFacing = 0): void {}
//TODO: export function applyAssistMarker(source: Unit, target: Unit, duration: float): void {}
export function spellEffectCreate(effectName: string = "", effectNameForOtherTeam: string = "", FOWTeam: TeamId = TeamId.UNKNOWN, fowVisibilityRadius: float = 0, flags: FXFlags = 0, specificTeamOnly: TeamId = TeamId.UNKNOWN, specificTeamOnlyOverride: TeamId = TeamId.UNKNOWN, specificUnitOnly?: AttackableUnit, useSpecificUnit: bool = false, bindObject?: AttackableUnit, boneName: string = "", pos: Vector3 = Vector3.Zero, targetObject?: AttackableUnit, targetBoneName: string = "", targetPos: Vector3 = Vector3.Zero, sendIfOnScreenOrDiscard: bool = false, persistsThroughReconnect: bool = false, bindFlexToOwnerPAR: bool = false, followsGroundTilt: bool = false, facesTarget: bool = false, orientTowards?: Unit): [ Particle, Particle ] {
    console.log(`Method is not implemented: ${ arguments.callee.name }`)
    return [ null! as Particle, null! as Particle ]
}
//TODO: export function spellEffectRemove(effectID?: Particle): void {}
export function applyDamage(attacker: Unit, target: Unit, damage: float, damageType: DamageType, sourceDamageType: DamageSource, percentOfAttack: float = 0, spellDamageRatio: float = 0, physicalDamageRatio: float = 0, ignoreDamageIncreaseMods: bool = false, ignoreDamageCrit: bool = false, callForHelpAttacker?: Unit): void {
    console.log(`Method is not implemented: ${ arguments.callee.name }`)
}
export function setBuffToolTipVar(index: int, value: float): void {
    console.log(`Method is not implemented: ${ arguments.callee.name }`)
}
//TODO: export function forEachUnitInTargetArea(attacker: ObjAIBase, center: Vector3, range: float, flags: SpellDataFlags, buffFilter: BuffScript, inclusiveBuffFilter: bool = false, : void {}
//TODO: export function forEachUnitInTargetAreaRandom(attacker: ObjAIBase, center: Vector3, range: float, flags: SpellDataFlags, maximumUnitsToPick: int, buffFilter: BuffScript, inclusiveBuffFilter: bool = false, : void {}
export function getNumberOfHeroesOnTeam(team: TeamId, connectedFromStart: bool, includeBots: bool = true): int {
    console.log(`Method is not implemented: ${ arguments.callee.name }`)
    return 0
}
export function spellBuffClear(target: Unit, buff: typeof BuffScript): void {
    console.log(`Method is not implemented: ${ arguments.callee.name }`)
}
//TODO: export function moveAway(unit: Unit, awayFrom: Vector3, speed: float, gravity: float, distance: float, distanceInner: float, movementType: ForceMovementType, movementOrdersType: ForceMovementOrdersType, idealDistance: float, movementOrdersFacing: ForceMovementOrdersFacing = 0): void {}
//TODO: export function getRandomPointInAreaUnit(target: Unit, radius: float, innerRadius: float): Vector3 { return Vector3.Zero }
//TODO: export function addPosPerceptionBubble(team: TeamId, radius: float, pos: Vector3, duration: float, specificUnitsClientOnly?: Unit, revealSteath: bool): Region {}
//TODO: export function faceDirection(target: Unit, location: Vector3): void {}
//TODO: export function setSpell(target: Unit, slotNumber: int, slotType: SpellSlotType, slotBook: SpellbookType, spell: typeof Spell): void {}
export function getSlotSpell(owner: Unit, spellSlot: int, spellbookType: SpellbookType = 0, slotType: SpellSlotType = 0): Spell {
    console.log(`Method is not implemented: ${ arguments.callee.name }`)
    return null! as Spell
}
//TODO: export function getSlotSpellCooldownTime(owner: Unit, : float { return 0 }
//TODO: export function getSlotSpellLevel(owner: Unit, : int { return 0 }
export function spellCast(caster: Unit, target: Unit | null, pos: Vector3 | null, endPos: Vector3 | null, slotNumber: int, slotType: SpellSlotType, overrideForceLevel: int = 0, overrideCoolDownCheck: bool = false, fireWithoutCasting: bool = false, useAutoAttackSpell: bool = false, forceCastingOrChannelling: bool = false, updateAutoAttackTimer: bool = false, overrideCastPosition: bool = false, overrideCastPos: Vector3 = Vector3.Zero): void {
    console.log(`Method is not implemented: ${ arguments.callee.name }`)
}
//TODO: export function sealSpellSlot(spellSlot: int, slotType: SpellSlotType, target: Unit, state: bool, spellbookType: SpellbookType = 0): void {}
//TODO: export function spellBuffRemoveType(target: Unit, type: BuffType): void {}
//TODO: export function setSlotSpellCooldownTimeVer2(src: float, slotNumber: int, slotType: SpellSlotType, spellbookType: SpellbookType, owner: Unit, broadcastEvent: bool = false): void {}
export function setSpellToolTipVar(value: float, index: int, slotNumber: int, slotType: SpellSlotType, slotBook: SpellbookType, target: Unit): void {
    console.log(`Method is not implemented: ${ arguments.callee.name }`)
}
//TODO: export function overrideAnimation(toOverrideAnim: string, overrideAnim: string, owner: Unit): void {}
export function getLevel(target: Unit): int { return target.stats!.level }
//TODO: export function playAnimation(animationName: string, scaleTime: float, target: Unit, loop: bool, blend: bool, Lock: bool = false): void {}
//TODO: export function unlockAnimation(owner: Unit, blend: bool = false): void {}
//TODO: export function setBuffCasterUnit(): Unit {}
//TODO: export function clearOverrideAnimation(toOverrideAnim: string, owner: Unit): void {}
//TODO: export function forNClosestUnitsInTargetArea(attacker: Unit, center: Vector3, range: float, flags: SpellDataFlags, maximumUnitsToPick: int, buffFilter?: BuffScript, inclusiveBuffFilter: bool = false, : void {}
export function canSeeTarget(viewer: Unit, target: Unit): bool {
    console.log(`Method is not implemented: ${ arguments.callee.name }`)
    return false
}
//TODO: export function getSkinID(unit: Unit): int { return 0 }
//TODO: export function destroyMissile(missileID?: SpellMissile): void {}
//TODO: export function addUnitPerceptionBubble(team: TeamId, radius: float, target: Unit, duration: float, specificUnitsClientOnly?: Unit, revealSpecificUnitOnly?: Unit, revealSteath: bool = false): Region {}
//TODO: export function removePerceptionBubble(bubbleID: Region): void {}
//TODO: export function getPARCost(spell: Spell): float { return 0 }
//TODO: export function getSpellSlot(spell: Spell): int { return 0 }
//TODO: export function getCastSpellLevelPlusOne(spell: Spell): int { return 0 }
//TODO: export function getIsAttackOverride(spell: Spell): bool { return false }
//TODO: export function getCastSpellTargetsHitPlusOne(spell: Spell): int { return 0 }
//TODO: export function getCastSpellTargetPos(spell: Spell): Vector3 { return Vector3.Zero }
//TODO: export function getCastSpellTargetPos(spell: Spell): Vector3 { return Vector3.Zero }
//TODO: export function getCastSpellDragEndPos(spell: Spell): Vector3 { return Vector3.Zero }
export function setDodgePiercing(target: Unit, value: bool): void {
    console.log(`Method is not implemented: ${ arguments.callee.name }`)
}
//TODO: export function say(owner: Unit, toSay: string, src?: object): void {}
//TODO: export function pushCharacterFade(target: Unit, fadeAmount: float, fadeTime: float, ID?: Fade): Fade? {}
export function overrideAutoAttack(spellSlot: int, slotType: SpellSlotType, owner: Unit, autoAttackSpellLevel: int, cancelAttack: bool): void {
    console.log(`Method is not implemented: ${ arguments.callee.name }`)
}
export function removeOverrideAutoAttack(owner: Unit, cancelAttack: bool): void {
    console.log(`Method is not implemented: ${ arguments.callee.name }`)
}
//TODO: export function setPARCostInc(spellSlotOwner: Unit, spellSlot: int, slotType: SpellSlotType, cost: float, PARType: PrimaryAbilityResourceType): void {}
//TODO: export function cancelAutoAttack(target: Unit, reset: bool): void {}
//TODO: export function getBuffRemainingDuration(target: Unit, buff: typeof BuffScript): float { return 0 }
//TODO: export function getChampionBySkinName(skin: string, team: TeamId): Champion? {}
export function issueOrder(whomToOrder: Unit, order: OrderType, targetOfOrderPosition?: Vector3, targetOfOrder?: Unit): void {
    console.log(`Method is not implemented: ${ arguments.callee.name }`)
}
//TODO: export function linkVisibility(unit1: Unit, unit2: Unit): void {}
//TODO: export function applyTaunt(attacker: Unit, target: Unit, duration: float): void {}
//TODO: export function stopChanneling(caster: Unit, stopCondition: ChannelingStopCondition, stopSource: ChannelingStopSource): void {}
//TODO: export function forEachChampion(team: TeamId, buffFilter?: BuffScript, inclusiveBuffFilter: bool = false, : void {}
//TODO: export function debugSay(owner: Unit, toSay: string, src?: object): void {}
//TODO: export function teleportToPosition(owner: Unit, : void {}
//TODO: export function pushCharacterData(skinName: string, target: Unit, overrideSpells: bool): int { return 0 }
//TODO: export function popCharacterData(target: Unit, ID: int, overrideSpells: bool = false): void {}
//TODO: export function distanceBetweenObjectAndPoint(Object: Unit, point: Vector3): float { return 0 }
//TODO: export function getUnitSkinName(target: Unit): string {}
//TODO: export function getPetOwner(pet: Pet): ObjAIBase {}
//TODO: export function startTrackingCollisions(target: Unit, value: bool): void {}
//TODO: export function incGold(target: Unit, delta: float): void {}
//TODO: export function setTargetingType(slotNumber: int, slotType: SpellSlotType, slotBook?: SpellbookType, targetType: TargetingType, target: Unit): void {}
//TODO: export function forNClosestVisibleUnitsInTargetArea(attacker: Unit, center: Vector3, range: float, flags: SpellDataFlags, maximumUnitsToPick: int, buffFilter?: BuffScript, inclusiveBuffFilter: bool = false, : void {}
//TODO: export function forEachUnitInTargetRectangle(attacker: Unit, center: Vector3, halfWidth: float, halfLength: float, flags: SpellDataFlags, buffFilter?: BuffScript, inclusiveBuffFilter: bool = false, : void {}
//TODO: export function destroyMissileForTarget(target: Unit): void {}
export function teleportToKeyLocation(owner: Unit, location: SpawnType, team: TeamId): void {
    console.log(`Method is not implemented: ${ arguments.callee.name }`)
}
//TODO: export function setPARColorOverride(owner: Unit, colorR: int, colorG: int, colorB: int, colorA: int, fadeR: int, fadeG: int, fadeB: int, fadeA: int): void {}
//TODO: export function setPARMultiplicativeCostInc(spellSlotOwner: Unit, spellSlot: int, slotType: SpellSlotType, cost: float, PARType: PrimaryAbilityResourceType): void {}
//TODO: export function popAllCharacterData(target: Unit): void {}
//TODO: export function setSpellOffsetTarget(slotNumber: int, slotType: SpellSlotType, spell: typeof Spell, spellbookType: SpellbookType, owner: Unit, offsetTarget: Unit): void {}
//TODO: export function pauseAnimation(unit: Unit, pause: bool): void {}
//TODO: export function skipNextAutoAttack(target: ObjAIBase): void {}
//TODO: export function setCameraPosition(: void {}
//TODO: export function stopMove(target: Unit): void {}
//TODO: export function setUseSlotSpellCooldownTime(src: float, owner: Unit, broadcastEvent: bool): void {}
//TODO: export function popCharacterFade(target: Unit, ID: Fade): void {}
//TODO: export function getOffsetAngle(unit: Unit, offsetPoint: Vector3): float { return 0 }
//TODO: export function setTriggerUnit(trigger: Unit): void {}
//TODO: export function setUnit(src: Unit): Unit {}
//TODO: export function setSlotSpellIcon(slotNumber: int, slotType: SpellSlotType, spellbookType: SpellbookType, owner: Unit, iconIndex: int): void {}
//TODO: export function isPathable(destPos: Vector3): bool { return false }
//TODO: export function setAutoAcquireTargets(target: Unit, value: bool): void {}
//TODO: export function redirectGold(redirectSource: Unit, redirectTarget?: Unit): void {}
//TODO: export function getGroundHeight(queryPos: Vector3): Vector3 { return Vector3.Zero }
//TODO: export function showHealthBar(unit: Unit, show: bool): void {}
//TODO: export function getRandomPointInAreaPosition(pos: Vector3, radius: float, innerRadius: float): Vector3 { return Vector3.Zero }
//TODO: export function fadeInColorFadeEffect(colorRed: int, colorGreen: int, colorBlue: int, fadeTime: float, maxWeight: float, specificToTeam: TeamId): void {}
//TODO: export function getSpellBlock(target: Unit): float { return 0 }
//TODO: export function getBuffStartTime(target: Unit, buff: typeof BuffScript): float { return 0 }
//TODO: export function incExp(target: Unit, delta: float): void {}
//TODO: export function stopCurrentOverrideAnimation(animationName: string, target: Unit, blend: bool): void {}
//TODO: export function getMissilePosFromID(targetID: SpellMissile): Vector3 { return Vector3.Zero }
//TODO: export function getIsZombie(unit: Unit): bool { return false }
//TODO: export function forEachPointOnLine(center: Vector3, faceTowardsPos: Vector3, size: float, pushForward: float, iterations: int, : void {}
//TODO: export function modifyPosition(ref position: Vector3, x: float, y: float, z: float): void {}
export function isInBrush(unit: Unit): bool {
    console.log(`Method is not implemented: ${ arguments.callee.name }`)
    return false
}
//TODO: export function moveToUnit(unit: Unit, target: Unit, speed: float, gravity: float, movementOrdersType: ForceMovementOrdersType, moveBackBy: float, maxTrackDistance: float, idealDistance: float, timeOverride: float): void {}
//TODO: export function forEachUnitInTargetAreaAddBuff(attacker: Unit, center: Vector3, range: float, flags: SpellDataFlags, buffAttacker: ObjAIBase, buff: typeof BuffScript = "", buffAddType: BuffAddType = 0, buffType: BuffType = 0, buffMaxStack: int = 1, buffNumberOfStacks: int = 1, buffDuration: float = 25000, : void {}
//TODO: export function forceDead(owner: Unit): void {}
//TODO: export function fadeOutColorFadeEffect(fadeTime: float, specificToTeam: TeamId): void {}
//TODO: export function applyNearSight(attacker: Unit, target: Unit, duration: float): void {}
//TODO: export function getNearestPassablePosition(: Vector3 { return Vector3.Zero }
//TODO: export function stopMoveBlock(target: Unit): void {}
//TODO: export function reincarnateHero(target: Unit): void {}
//TODO: export function alert(toAlert: string, src?: object): void {}
//TODO: export function getDamagingBuff(): Buff {}
//TODO: export function invalidateUnit(target: Unit): void {}
//TODO: export function forEachVisibleUnitInTargetAreaRandom(attacker: Unit, center: Vector3, range: float, flags: SpellDataFlags, maximumUnitsToPick: int, buffFilter: BuffScript, inclusiveBuffFilter: bool, : void {}
//TODO: export function incSpellLevel(spellSlotOwner: Unit, spellSlot: int, slotType: SpellSlotType): void {}
//TODO: export function setNotTargetableToTeam(target: Unit, toAlly: bool, toEnemy: bool): void {}
//TODO: export function setScaleSkinCoef(scale: float, owner: Unit): void {}
//TODO: export function clearPARColorOverride(spellSlotOwner: Unit): void {}
//TODO: export function getPARMultiplicativeCostInc(spellSlotOwner: Unit, spellSlot: int, slotType: SpellSlotType, PARType: PrimaryAbilityResourceType): float { return 0 }
//TODO: export function forEachPointAroundCircle(center: Vector3, radius: float, iterations: int, : void {}
//TODO: export function forceRefreshPath(unit: Unit): void {}
//TODO: export function removeLinkVisibility(unit1: Unit, unit2: Unit): void {}
//TODO: export function updateCanCast(target: Unit): void {}
//TODO: export function setSpellCastRange(newRange: float): void {}
//TODO: export function dispellNegativeBuffs(attacker: Unit): void {}
//TODO: export function setVoiceOverride(overrideSuffix: string, target: Unit): void {}
//TODO: export function resetVoiceOverride(target: Unit): void {}
//TODO: export function testUnitAttributeFlag(target: Unit, attributeFlag: ExtraAttributeFlag): bool { return false }
//TODO: export function getCastRange(spellSlotOwner: ObjAIBase, slotNumber: int, slotType: SpellSlotType): float { return 0 }
//TODO: export function modifyShield(unit: Unit, amount: float = 0, magicShield: bool = false, physicalShield: bool = false, noFade: bool = false): void {}
//TODO: export function increaseShield(unit: Unit, amount: float = 0, magicShield: bool = false, physicalShield: bool = false): void {}
//TODO: export function reduceShield(unit: Unit, amount: float = 0, magicShield: bool = false, physicalShield: bool = false): void {}
//TODO: export function removeShield(unit: Unit, amount: float = 0, magicShield: bool = false, physicalShield: bool = false): void {}
//TODO: export function createItem(unit: Unit, itemID: int): void {}
//TODO: export function defUpdateAura(center: Vector3, range: float, unitScan: Unit, buff: typeof BuffScript): void {}
//TODO: export function getSourceType(): DamageSource {}
//TODO: export function isObjectAI(obj: object): bool { return false }
//TODO: export function isObjectHero(obj: object): bool { return false }
//TODO: export function isMelee(obj: object): bool { return false }
//TODO: export function isTurretAI(obj: object): bool { return false }
//TODO: export function isDead(obj: object): bool { return false }
//TODO: export function BBIsTargetInFrontOfMe(left: Unit, right: Unit): bool { return false }
//TODO: export function BBIsTargetBehindMe(left: Unit, right: Unit): bool { return false }
//TODO: export function hasBuffOfType(target: Unit, buffType: BuffType): bool { return false }
//TODO: export function hasBuff(target: Unit, buff: typeof BuffScript): bool { return false }
//TODO: export function hasPARType(owner: Unit, PARType: PrimaryAbilityResourceType): bool { return false }
//TODO: export function getPosition(target: Unit): Vector3 { return Vector3.Zero }
//TODO: export function getNormalizedPositionDelta(target: Unit, attacker: Unit, unknown: bool): Vector3 { return Vector3.Zero }
//TODO: export function setPosition(target: Unit, position: Vector3): void {}
//TODO: export function setCanCastWhileDisabled(canCast: bool): void {}
//TODO: export function ALERT(smth: object): void {}
//TODO: export function getGold(): int { return 0 }
//TODO: export function spellBuffRenew(target: Unit, buff: typeof BuffScript, resetDuration: float = 0): void {}
//TODO: export function make3DPoint(x: float, y: float, z: float): Vector3 { return Vector3.Zero }
//TODO: export function distanceBetweenObjects(object1: GameObject, object2: GameObject): float { return 0 }
//TODO: export function getObjectLaneId(unit: Unit): int { return 0 }
//TODO: export function isTurretAI(unit: Unit): bool { return false }
//TODO: export function getTurret(team: int, lane: int, position: int): LaneTurret? {}
//TODO: export function getTurretPosition(unit: Unit): int { return 0 }
//TODO: export function createChildTurret(turretName: string, turretModel: string, team: int, turretIndex: int, lane: int): LaneTurret? {}
//TODO: export function spawnTurret(turretName: string, turretModel: string, team: int, turretIndex: int, lane: int): LaneTurret? {}
//TODO: export function isDampener(unit: Unit): bool { return false }
//TODO: export function getDampener(team: int, lane: int): Inhibitor {}
//TODO: export function getDampenerType(unit: Unit): int { return 0 }
//TODO: export function setDampenerRespawnAnimationDuration(inhibitor: Inhibitor, respawnAnimationDuration: float): void {}
//TODO: export function getLinkedBarrack(unit: Inhibitor): Barrack {}
//TODO: export function getLane(unit: Unit): int { return 0 }
//TODO: export function getBarracks(team: int, lane: int): Barrack? {}
//TODO: export function setDampenerState(unit: Unit, state: DampenerState): void {}
//TODO: export function getHQ(team: int): Nexus? {}
//TODO: export function getHQType(unit: Unit): int { return 0 }
//TODO: export function setNotTargetableToTeam(unit?: Unit, notTargetable: bool, team: int): void {}
//TODO: export function setDisableMinionSpawn(barrack: Barrack, seconds: float): void {}
//TODO: export function getTotalTeamMinionsSpawned(): int { return 0 }
//TODO: export function getGameMode(): string {}
//TODO: export function applyPersistentBuffToAllChampions(buff: typeof BuffScript, isInternal: bool): void {}
//TODO: export function applyPersistentBuff(target: Unit, buff: typeof BuffScript, bool isInternal , int stackCount , maxStacks: int): void {}
//TODO: export function addBuffCounter(target: Unit, buff: typeof BuffScript, int unk , maxStacks: int): void {}
//TODO: export function setBuildingHealthRegenEnabled(building: ObjBuilding, enabled: bool): void {}
//TODO: export function setBarracksSpawnEnabled(enabled: bool): void {}
//TODO: export function disableHUDForEndOfGame(): void {}
//TODO: export function moveCameraFromCurrentPositionToPoint(champion: Champion, luaPosition?: Vector3, travelTime: float, unk: bool): void {}
//TODO: export function getEoGPanToHQTime(): float { return 0 }
//TODO: export function getEoGNexusChangeSkinTime(): float { return 0 }
//TODO: export function getEoGUseNexusDeathAnimation(): bool { return false }
//TODO: export function setGreyscaleEnabledWhenDead(champion: Champion, enabled: bool): void {}
//TODO: export function fadeOutMainSFX(): bool { return false }
//TODO: export function setHQCurrentSkin(team: int, skinId: int): void {}
//TODO: export function setMinionsNoRender(team: int, enabled: bool): void {}
//TODO: export function fadeMinions(team: int, fadeAmmont: float, fadeTime: float): void {}
//TODO: export function haltAllAI(): void {}
//TODO: export function setInputLockFlag(flag: InputLockFlags, enabled: bool): void {}
//TODO: export function closeShop(): void {}
//TODO: export function endGame(winningTeam: int): void {}
//TODO: export function log(message: string): void {}
//TODO: export function initNeutralMinionTimer(function: Closure, timerType: string, delay: float, spawnDuration: float, repeat: bool): void {}
//TODO: export function initNeutralMinionTimerCS(callback: Action, timerType: string, delay: float, spawnDuration: float, repeat: bool): void {}
//TODO: export function createNeutralCampCS(neutralCamp: CampData, groupNumber: int): void {}
//TODO: export function createNeutralCamp(neutralCamp: Table, groupNumber: int): void {}
//TODO: export function spawnNeutralMinionCS(neutralCamp: CampData, groupNumber: int, groupIndex: int, nameIndex: int): void {}
//TODO: export function spawnNeutralMinion(neutralCamp: Table, groupNumber: int, groupIndex: int, nameIndex: int): void {}
//TODO: export function giveExpToNearHeroesFromNeutral(obj: ObjAIBase, exp: float, position: LVector3, radius: float): void {}
//TODO: export function AIScriptSpellBuffAdd(target: Unit, caster: ObjAIBase, buff: typeof BuffScript, buffType: int, duration: float): void {}
//TODO: export function AIScriptSpellBuffRemove(target: Unit, buff: typeof BuffScript): void {}
//TODO: export function isHeroAI(unit: Unit): bool { return false }
//TODO: export function setActorPositionFromObject(unit: Unit, teleportUnit: Unit): void {}
//TODO: export function distanceBetweenObjectBounds(unitOne: Unit, unitTwo: Unit): float { return 0 }
//TODO: export function distanceBetweenObjectCenterAndPoint(target?: Unit, point: Vector2): float { return 0 }
//TODO: export function isNetworkLocal(): bool { return false }
//TODO: export function die(target: Unit, damageSource: DamageSource): void {}
//TODO: export function targetIsMoving(target: Unit): bool { return false }
//TODO: export function isAutoAcquireTargetEnabled(target: Unit): bool { return false }
//TODO: export function getPos(target: Unit): Vector3 { return Vector3.Zero }
//TODO: export function getOwner(target: Unit): Unit? {}
//TODO: export function initTimerCS(function: Action, delay: float, repeat: bool): void {}
//TODO: export function addRestrictedZone(top: float, left: float, width: float, height: float, position: Vector2, radius: float, position3D: Vector3): void {}
//TODO: export function removeRestrictedZones(): void {}
//TODO: export function isDestinationRestricted(castPos: Vector2, owner: ObjAIBase): bool { return false }
//TODO: export function restrictedAreaPos(castPos: Vector3, owner: ObjAIBase): Vector3 { return Vector3.Zero }
//TODO: export function setGameScoreCS(team: TeamId, score: int = 0): void {}

//TODO: export function spawnPet(name: string, skin: string, buff: string, aiScript?: string, duration: float, pos: Vector3, healthBonus: float, damageBonus: float, petOwner?: Champion, originSpell?: Spell): Pet {}
//TODO: export function cloneUnitPet(unitToClone: Unit, buff: string, duration: float, pos: Vector3, healthBonus: float, damageBonus: float, showMinimapIcon: bool, petOwner?: Champion, originSpell?: Spell): Pet {}
export function spellBuffAdd(attacker: Unit, target: Unit, buffScript: BuffScript, maxStack: int = 1, numberOfStacks: int = 1, duration: float = 25000, buffAddType: BuffAddType = BuffAddType.REPLACE_EXISTING, buffType: BuffType = BuffType.INTERNAL, tickRate: float = 0, stacksExclusive: bool = false, canMitigateDuration: bool = false, isHiddenOnClient: bool = false, originSpell?: Spell): void {
    console.log(`Method is not implemented: ${ arguments.callee.name }`)
}
//TODO: export function applySilence(attacker: Unit, target: Unit, duration: float, originSpell?: Spell): void {}
//TODO: export function applyStun(attacker: Unit, target: Unit, duration: float, originSpell?: Spell): void {}
//TODO: export function applyFear(attacker: Unit, target: Unit, duration: float, originSpell?: Spell): void {}
//TODO: export function applyRoot(attacker: Unit, target: Unit, duration: float, originSpell?: Spell): void {}
export function getBuffCountFromCaster(target: Unit, caster: Unit | null, buff: typeof BuffScript): int {
    console.log(`Method is not implemented: ${ arguments.callee.name }`)
    return 0
}
//TODO: export function hasBuff(target: Unit, caster?: Unit, buff: typeof BuffScript): bool { return false }
//TODO: export function getBuffCountFromAll(target: Unit, buff: typeof BuffScript): int { return 0 }
export function breakSpellShields(target: Unit): void {
    console.log(`Method is not implemented: ${ arguments.callee.name }`)
}
export function spellBuffRemoveStacks(target: Unit, attacker: Unit, buff: typeof BuffScript, numStacks: int = 0): void {
    console.log(`Method is not implemented: ${ arguments.callee.name }`)
}
export function executePeriodicallyReset(trackTime: LastTimeExecuted): void {
    console.log(`Method is not implemented: ${ arguments.callee.name }`)
}

export function isObjectAI(obj: Unit): bool {
    console.log(`Method is not implemented: ${ arguments.callee.name }`)
    return false
}
export function isObjectHero(obj: Unit): bool {
    console.log(`Method is not implemented: ${ arguments.callee.name }`)
    return false
}
export function isTurretAI(obj: Unit): bool {
    console.log(`Method is not implemented: ${ arguments.callee.name }`)
    return false
}

export function hasScript(spell: Spell, script: typeof SpellScript): bool {
    console.log(`Method is not implemented: ${ arguments.callee.name }`)
    return false
}

export function executePeriodically(timeBetweenExecutions: float, trackTime: LastTimeExecuted, executeImmediately: bool = false, tickTime: float = 0): bool {
    console.log(`Method is not implemented: ${ arguments.callee.name }`)
    return false
}
// export function isRanged(ai: AttackableUnit): bool { return false }
// export function isMelee(ai: AttackableUnit): bool { return false }
// export function isInFront(me: AttackableUnit, target: AttackableUnit): bool { return false }
// export function isBehind(me: AttackableUnit, target: AttackableUnit): bool { return false }
// export function randomChance(): float { return 0 }
// export function randomInt(min: int, max: int): int { return 0 }
export function getUnitsInArea(attacker: AttackableUnit, center: Vector3, range: float, flags: SpellDataFlags = 0, buffFilter?: BuffScript, inclusiveBuffFilter: bool = false): Iterable<AttackableUnit> {
    console.log(`Method is not implemented: ${ arguments.callee.name }`)
    return []
}
// export function getRandomUnitsInArea(attacker: AttackableUnit, center: Vector3, range: float, flags: SpellDataFlags, maximumUnitsToPick: int, buffFilter?: BuffScript, inclusiveBuffFilter: bool = false): Iterable<AttackableUnit> {}
// export function getClosestUnitsInArea(attacker: AttackableUnit, center: Vector3, range: float, flags: SpellDataFlags, maximumUnitsToPick: int, buffFilter?: BuffScript, inclusiveBuffFilter: bool = false, unitToIgnore: AttackableUnit = null): Iterable<AttackableUnit> {}
// export function getVisibleUnitsInArea(attacker: AttackableUnit, center: Vector3, range: float, flags: SpellDataFlags, buffFilter?: BuffScript, inclusiveBuffFilter: bool = false): Iterable<AttackableUnit> {}
// export function getClosestVisibleUnitsInArea(attacker: AttackableUnit, center: Vector3, range: float, flags: SpellDataFlags, maximumUnitsToPick: int, buffFilter?: BuffScript, inclusiveBuffFilter: bool = false, unittoignore: AttackableUnit = null): Iterable<AttackableUnit> {}
// export function getChampions(team: TeamId, buffFilter?: BuffScript, inclusiveBuffFilter: bool = false): Iterable<Champion> {}
// export function getUnitsInRectangle(attacker: AttackableUnit, center: Vector3, halfWidth: float, halfLength: float, flags: SpellDataFlags, buffFilter?: BuffScript, inclusiveBuffFilter: bool = false): Iterable<AttackableUnit> {}
// export function getRandomVisibleUnitsInArea(attacker: AttackableUnit, center: Vector3, range: float, flags: SpellDataFlags, maximumUnitsToPick: int, buffFilter?: BuffScript, inclusiveBuffFilter: bool): Iterable<AttackableUnit> {}
// export function getPointsOnLine(center: Vector3, faceTowardsPos: Vector3, size: float, pushForward: float, iterations: int): Iterable<Vector3> {}
// export function getPointsAroundCircle(center: Vector3, radius: float, iterations: int): Iterable<Vector3> {}
// export function isDead(u: AttackableUnit): bool { return false }
// export function getPARCost(spell: Spell): float { return 0 }
// export function getSpellSlot(spell: Spell): int { return 0 }
// export function getSpellLevelPlusOne(spell: Spell): int { return 0 }
// export function getIsAttackOverride(spell: Spell): bool { return false }
// export function getSpellTargetsHitPlusOne(spell: Spell): int { return 0 }
// export function getSpellTargetPos(spell: Spell): Vector3 { return Vector3.Zero }
// export function getSpellDragEndPos(spell: Spell): Vector3 { return Vector3.Zero }
export function getEnemyTeam(team: TeamId): TeamId {
    console.log(`Method is not implemented: ${ arguments.callee.name }`)
    return TeamId.Unknown
}
//}