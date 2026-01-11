import type { Unit } from "../ecf/unit"

//namespace API {
export function getDisableAmbientGold(unit: Unit){ return unit.status!.disableAmbientGold }
export function getForceRenderParticles(unit: Unit){ return unit.status!.forceRenderParticles }
export function getIgnoreCallForHelp(unit: Unit){ return unit.status!.ignoreCallForHelp }
export function getNoRender(unit: Unit){ return unit.status!.noRender }
export function getRevealSpecificUnit(unit: Unit){ return unit.status!.revealSpecificUnit }
export function getSuppressCallForHelp(unit: Unit){ return unit.status!.suppressCallForHelp }

export function getCallForHelpSuppresser(unit: Unit){ return unit.status!.isCallForHelpSuppresser }
    
export function getCanAttack(unit: Unit){ return unit.status!.canAttack }
export function getCanCast(unit: Unit){ return unit.status!.canCast }
export function getCanMove(unit: Unit){ return unit.status!.canMove }

export function getCharmed(unit: Unit){ return unit.status!.isCharmed }
export function getDisarmed(unit: Unit){ return unit.status!.isDisarmed }
export function getFeared(unit: Unit){ return unit.status!.isFeared }
export function getGhosted(unit: Unit){ return unit.status!.isGhosted }
export function getGhostProof(unit: Unit){ return unit.status!.isGhostProof }
export function getImmovable(unit: Unit){ return unit.status!.isImmovable }
export function getInvulnerable(unit: Unit){ return unit.status!.isInvulnerable }
export function getMagicImmune(unit: Unit){ return unit.status!.isMagicImmune }
export function getNearSight(unit: Unit){ return unit.status!.isNearSighted }
export function getNetted(unit: Unit){ return unit.status!.isNetted }
export function getPacified(unit: Unit){ return unit.status!.isPacified }
export function getPhysicalImmune(unit: Unit){ return unit.status!.isPhysicalImmune }
export function getRooted(unit: Unit){ return unit.status!.isRooted }
export function getSilenced(unit: Unit){ return unit.status!.isSilenced }
export function getSleep(unit: Unit){ return unit.status!.isSleeping }
export function getStealthed(unit: Unit){ return unit.status!.isStealthed }
export function getStunned(unit: Unit){ return unit.status!.isStunned }
export function getSuppressed(unit: Unit){ return unit.status!.isSuppressed }
export function getTargetable(unit: Unit){ return unit.status!.isTargetable }
export function getTaunted(unit: Unit){ return unit.status!.isTaunted }
    
export function isMoving(unit: Unit){ return unit.status!.isMoving }

export function setDisableAmbientGold(unit: Unit, value: boolean){ unit.status!.disableAmbientGold = value }
export function setForceRenderParticles(unit: Unit, value: boolean){ unit.status!.forceRenderParticles = value }
export function setIgnoreCallForHelp(unit: Unit, value: boolean){ unit.status!.ignoreCallForHelp = value }
export function setNoRender(unit: Unit, value: boolean){ unit.status!.noRender = value }
export function setRevealSpecificUnit(unit: Unit, value: boolean){ unit.status!.revealSpecificUnit = value }
export function setSuppressCallForHelp(unit: Unit, value: boolean){ unit.status!.suppressCallForHelp = value }

export function setCallForHelpSuppresser(unit: Unit, value: boolean){ unit.status!.isCallForHelpSuppresser = value }
    
export function setCanAttack(unit: Unit, value: boolean){ unit.status!.canAttack = value }
export function setCanCast(unit: Unit, value: boolean){ unit.status!.canCast = value }
export function setCanMove(unit: Unit, value: boolean){ unit.status!.canMove = value }

export function setCharmed(unit: Unit, value: boolean){ unit.status!.isCharmed = value }
export function setDisarmed(unit: Unit, value: boolean){ unit.status!.isDisarmed = value }
export function setFeared(unit: Unit, value: boolean){ unit.status!.isFeared = value }
export function setGhosted(unit: Unit, value: boolean){ unit.status!.isGhosted = value }
export function setGhostProof(unit: Unit, value: boolean){ unit.status!.isGhostProof = value }
export function setImmovable(unit: Unit, value: boolean){ unit.status!.isImmovable = value }
export function setInvulnerable(unit: Unit, value: boolean){ unit.status!.isInvulnerable = value }
export function setMagicImmune(unit: Unit, value: boolean){ unit.status!.isMagicImmune = value }
export function setNearSight(unit: Unit, value: boolean){ unit.status!.isNearSighted = value }
export function setNetted(unit: Unit, value: boolean){ unit.status!.isNetted = value }
export function setPacified(unit: Unit, value: boolean){ unit.status!.isPacified = value }
export function setPhysicalImmune(unit: Unit, value: boolean){ unit.status!.isPhysicalImmune = value }
export function setRooted(unit: Unit, value: boolean){ unit.status!.isRooted = value }
export function setSilenced(unit: Unit, value: boolean){ unit.status!.isSilenced = value }
export function setSleep(unit: Unit, value: boolean){ unit.status!.isSleeping = value }
export function setStealthed(unit: Unit, value: boolean){ unit.status!.isStealthed = value }
export function setStunned(unit: Unit, value: boolean){ unit.status!.isStunned = value }
export function setSuppressed(unit: Unit, value: boolean){ unit.status!.isSuppressed = value }
export function setTargetable(unit: Unit, value: boolean){ unit.status!.isTargetable = value }
export function setTaunted(unit: Unit, value: boolean){ unit.status!.isTaunted = value }
//}
