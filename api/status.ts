import type { Unit } from "../ecf/unit"

namespace API {
    function getDisableAmbientGold(unit: Unit){ return unit.status!.disableAmbientGold }
    function getForceRenderParticles(unit: Unit){ return unit.status!.forceRenderParticles }
    function getIgnoreCallForHelp(unit: Unit){ return unit.status!.ignoreCallForHelp }
    function getNoRender(unit: Unit){ return unit.status!.noRender }
    function getRevealSpecificUnit(unit: Unit){ return unit.status!.revealSpecificUnit }
    function getSuppressCallForHelp(unit: Unit){ return unit.status!.suppressCallForHelp }

    function getCallForHelpSuppresser(unit: Unit){ return unit.status!.isCallForHelpSuppresser }
    
    function getCanAttack(unit: Unit){ return unit.status!.canAttack }
    function getCanCast(unit: Unit){ return unit.status!.canCast }
    function getCanMove(unit: Unit){ return unit.status!.canMove }

    function getCharmed(unit: Unit){ return unit.status!.isCharmed }
    function getDisarmed(unit: Unit){ return unit.status!.isDisarmed }
    function getFeared(unit: Unit){ return unit.status!.isFeared }
    function getGhosted(unit: Unit){ return unit.status!.isGhosted }
    function getGhostProof(unit: Unit){ return unit.status!.isGhostProof }
    function getImmovable(unit: Unit){ return unit.status!.isImmovable }
    function getInvulnerable(unit: Unit){ return unit.status!.isInvulnerable }
    function getMagicImmune(unit: Unit){ return unit.status!.isMagicImmune }
    function getNearSight(unit: Unit){ return unit.status!.isNearSighted }
    function getNetted(unit: Unit){ return unit.status!.isNetted }
    function getPacified(unit: Unit){ return unit.status!.isPacified }
    function getPhysicalImmune(unit: Unit){ return unit.status!.isPhysicalImmune }
    function getRooted(unit: Unit){ return unit.status!.isRooted }
    function getSilenced(unit: Unit){ return unit.status!.isSilenced }
    function getSleep(unit: Unit){ return unit.status!.isSleeping }
    function getStealthed(unit: Unit){ return unit.status!.isStealthed }
    function getStunned(unit: Unit){ return unit.status!.isStunned }
    function getSuppressed(unit: Unit){ return unit.status!.isSuppressed }
    function getTargetable(unit: Unit){ return unit.status!.isTargetable }
    function getTaunted(unit: Unit){ return unit.status!.isTaunted }
    
    function isMoving(unit: Unit){ return unit.status!.isMoving }

    function setDisableAmbientGold(unit: Unit, value: boolean){ unit.status!.disableAmbientGold = value }
    function setForceRenderParticles(unit: Unit, value: boolean){ unit.status!.forceRenderParticles = value }
    function setIgnoreCallForHelp(unit: Unit, value: boolean){ unit.status!.ignoreCallForHelp = value }
    function setNoRender(unit: Unit, value: boolean){ unit.status!.noRender = value }
    function setRevealSpecificUnit(unit: Unit, value: boolean){ unit.status!.revealSpecificUnit = value }
    function setSuppressCallForHelp(unit: Unit, value: boolean){ unit.status!.suppressCallForHelp = value }

    function setCallForHelpSuppresser(unit: Unit, value: boolean){ unit.status!.isCallForHelpSuppresser = value }
    
    function setCanAttack(unit: Unit, value: boolean){ unit.status!.canAttack = value }
    function setCanCast(unit: Unit, value: boolean){ unit.status!.canCast = value }
    function setCanMove(unit: Unit, value: boolean){ unit.status!.canMove = value }

    function setCharmed(unit: Unit, value: boolean){ unit.status!.isCharmed = value }
    function setDisarmed(unit: Unit, value: boolean){ unit.status!.isDisarmed = value }
    function setFeared(unit: Unit, value: boolean){ unit.status!.isFeared = value }
    function setGhosted(unit: Unit, value: boolean){ unit.status!.isGhosted = value }
    function setGhostProof(unit: Unit, value: boolean){ unit.status!.isGhostProof = value }
    function setImmovable(unit: Unit, value: boolean){ unit.status!.isImmovable = value }
    function setInvulnerable(unit: Unit, value: boolean){ unit.status!.isInvulnerable = value }
    function setMagicImmune(unit: Unit, value: boolean){ unit.status!.isMagicImmune = value }
    function setNearSight(unit: Unit, value: boolean){ unit.status!.isNearSighted = value }
    function setNetted(unit: Unit, value: boolean){ unit.status!.isNetted = value }
    function setPacified(unit: Unit, value: boolean){ unit.status!.isPacified = value }
    function setPhysicalImmune(unit: Unit, value: boolean){ unit.status!.isPhysicalImmune = value }
    function setRooted(unit: Unit, value: boolean){ unit.status!.isRooted = value }
    function setSilenced(unit: Unit, value: boolean){ unit.status!.isSilenced = value }
    function setSleep(unit: Unit, value: boolean){ unit.status!.isSleeping = value }
    function setStealthed(unit: Unit, value: boolean){ unit.status!.isStealthed = value }
    function setStunned(unit: Unit, value: boolean){ unit.status!.isStunned = value }
    function setSuppressed(unit: Unit, value: boolean){ unit.status!.isSuppressed = value }
    function setTargetable(unit: Unit, value: boolean){ unit.status!.isTargetable = value }
    function setTaunted(unit: Unit, value: boolean){ unit.status!.isTaunted = value }
}
