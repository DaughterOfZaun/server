import { Vector3 } from "../../math"
import { Orders } from "../../net/pkt"

enum AIState {
    IDLE = 0,
    SOFTATTACK = 1,
    HARDATTACK = 2,
    ATTACKMOVE = 3,
    STANDING = 4,
    MOVE = 5,
    ATTACK = 7,
    HARDIDLE = 9,
    TAUNTED = 11,
    FEARED = 13,
    CHARMED = 14,
    ATTACK_GOING_TO_LAST_KNOWN_LOCATION = 16,
    HALTED = 17,
}

enum StopReason {
    IMMEDIATELY = 0,
    MOVING = 2,
}

enum LostReason {
    UNDEFINED = 0,
    LOST_VISIBILITY = 1,
}

enum BuffType {
    Internal = 0,
    Aura = 1,
    CombatEnchancer = 2,
    CombatDehancer = 3,
    SpellShield = 4,
    Stun = 5,
    Invisibility = 6,
    Silence = 7,
    Taunt = 8,
    Polymorph = 9,
    Slow = 10,
    Snare = 11,
    Damage = 12,
    Heal = 13,
    Haste = 14,
    SpellImmunity = 15,
    PhysicalImmunity = 16,
    Invulnerability = 17,
    Sleep = 18,
    NearSight = 19,
    Frenzy = 20,
    Fear = 21,
    Net = 22,
    Poison = 23,
    Suppression = 24,
    Blind = 25,
    AmmoStack = 26
}

type Unit = {}

function getPercentAttackSpeedMod() { return 0 }

function assignTargetPosInPos() { }
function clearTargetPosInPos() { }

function getState() { return AIState.IDLE }
function setState(state: AIState) { }
function netSetState(state: AIState) { }
function setStateAndMove(state: AIState, position: Vector3) { }
function setStateAndMoveInPos(state: AIState) { }
function setStateAndCloseToTarget(state: AIState, target: Unit) { }

function initTimer(name: string, interval: number, unk: boolean) { }
function resetAndStartTimer(name: string) { }
function stopTimer(name: string) { }

function getTarget() { return null! as Unit }
function findTargetInAcR() { return null! as Unit }
function getTargetOrFindTargetInAcR() { return null! as Unit }
function targetInAttackRange() { return false }
function targetInCancelAttackRange() { return false }
function isTargetLost() { return false }
function getLostTargetIfVisible() { return null! as Unit }

function getTauntTarget() { return null! as Unit }
function getFearLeashPoint() { return Vector3.Zero }

function makeWanderPoint(point: Vector3, distance: number) { return Vector3.Zero }

function turnOnAutoAttack(target: Unit) { }
function turnOffAutoAttack(reason: StopReason) { }
function lastAutoAttackFinished() { return false }

function canSeeMe(observer: Unit) { return false }

const me = null! as Unit
function spellBuffRemoveType(target: Unit, type: BuffType) { }

function isMoving() { return false }
function isMovementStopped() { return false }

function say(what: string) { }

function distanceBetweenObjectAndTargetPosSq(obj: Unit) { return 0 }

const FEAR_WANDER_DISTANCE = 500

function calculateAttackTimer() {
    let checkAttackTimer = 1.6 / (getPercentAttackSpeedMod() + 1)
    if (checkAttackTimer < 0.5) {
        checkAttackTimer = 0.5
    }
    return checkAttackTimer
}

function onInit() {
    clearTargetPosInPos()
    setState(AIState.IDLE)
    initTimer("TimerDistanceScan", 0.2, true)
    initTimer("TimerCheckAttack", 0.2, true)
    initTimer("TimerFeared", 1, true)
    stopTimer("TimerFeared")
    return false
}

function onOrder(order: Orders, target: Unit) {
    const state = getState()
    if (state === AIState.HALTED) {
        return false
    }
    if (state === AIState.TAUNTED || state === AIState.FEARED || state === AIState.CHARMED) {
        return false
    }
    if (order === Orders.TAUNT) {
        setStateAndCloseToTarget(AIState.HARDATTACK, target)
        clearTargetPosInPos()
        return true
    }
    if (order === Orders.ATTACKTO) {
        setStateAndCloseToTarget(AIState.HARDATTACK, target)
        assignTargetPosInPos()
        if (targetInAttackRange() === true) {
            turnOnAutoAttack(getTarget())
        } else {
            turnOffAutoAttack(StopReason.MOVING)
        }
        return true
    }
    if (order === Orders.ATTACKMOVE) {
        const newTarget = findTargetInAcR()
        if (newTarget !== undefined) {
            setStateAndCloseToTarget(AIState.SOFTATTACK, newTarget)
            return true
        }
        setStateAndMoveInPos(AIState.ATTACKMOVE)
        assignTargetPosInPos()
        return true
    }
    if (order === Orders.MOVETO) {
        setStateAndMoveInPos(AIState.MOVE)
        assignTargetPosInPos()
        return true
    }
    timerCheckAttack()
    return false
}

function onTargetLost(reason: LostReason, target: Unit) {
    const state = getState()
    if (state === AIState.HALTED) {
        return
    }
    if (AIState.ATTACK_GOING_TO_LAST_KNOWN_LOCATION !== state) {
        if (
            reason === LostReason.LOST_VISIBILITY &&
            state !== AIState.SOFTATTACK &&
            target !== undefined
        ) {
            setStateAndCloseToTarget(AIState.ATTACK_GOING_TO_LAST_KNOWN_LOCATION, target)
        } else {
            timerCheckAttack()
        }
    }
}

function onTauntBegin() {
    if (getState() === AIState.HALTED) {
        return
    }
    const tauntTarget = getTauntTarget()
    if (tauntTarget !== undefined) {
        setStateAndCloseToTarget(AIState.TAUNTED, tauntTarget)
    }
}

function onTauntEnd() {
    if (getState() === AIState.HALTED) {
        return
    }
    const tauntTarget = getTauntTarget()
    if (tauntTarget !== undefined) {
        setStateAndCloseToTarget(AIState.SOFTATTACK, tauntTarget)
    } else {
        netSetState(AIState.IDLE)
        timerDistanceScan()
        timerCheckAttack()
    }
}

function onFearBegin() {
    if (getState() === AIState.HALTED) {
        return
    }
    const wanderPoint = makeWanderPoint(getFearLeashPoint(), FEAR_WANDER_DISTANCE)
    setStateAndMove(AIState.FEARED, wanderPoint)
    turnOffAutoAttack(StopReason.MOVING)
    resetAndStartTimer("TimerFeared")
}

function onFearEnd() {
    if (getState() === AIState.HALTED) {
        return
    }
    stopTimer("TimerFeared")
    netSetState(AIState.IDLE)
    timerDistanceScan()
    timerCheckAttack()
}

function timerFeared() {
    if (getState() === AIState.HALTED) {
        return
    }
    const wanderPoint = makeWanderPoint(getFearLeashPoint(), FEAR_WANDER_DISTANCE)
    setStateAndMove(AIState.FEARED, wanderPoint)
}

function onCharmBegin() {
    if (getState() === AIState.HALTED) {
        return
    }
    netSetState(AIState.CHARMED)
    turnOffAutoAttack(StopReason.IMMEDIATELY)
    timerCheckAttack()
}

function onCharmEnd() {
    if (getState() === AIState.HALTED) {
        return
    }
    netSetState(AIState.IDLE)
    timerDistanceScan()
    timerCheckAttack()
}

function onStopMove() {
    if (getState() === AIState.HALTED) {
        return
    }
    clearTargetPosInPos()
}

function timerCheckAttack() {
    const state = getState()
    if (state === AIState.HALTED) {
        return
    }
    if (
        state === AIState.SOFTATTACK ||
        state === AIState.HARDATTACK ||
        state === AIState.TAUNTED ||
        state === AIState.CHARMED
    ) {
        if (isTargetLost() === true || getTarget() === undefined) {
            if (lastAutoAttackFinished() === false) {
                initTimer("TimerCheckAttack", 0.1, true)
                return false
            }
            const newTarget = findTargetInAcR()
            if (newTarget !== undefined) {
                if (state === AIState.CHARMED) {
                    setStateAndCloseToTarget(AIState.CHARMED, newTarget)
                } else if (canSeeMe(newTarget)) {
                    setStateAndCloseToTarget(AIState.SOFTATTACK, newTarget)
                }
                return true
            } else {
                if (state === AIState.CHARMED) {
                    spellBuffRemoveType(me, BuffType.Taunt)
                }
                netSetState(AIState.STANDING)
                return true
            }
            return true
        }
        if (targetInAttackRange() === true) {
            turnOnAutoAttack(getTarget())
            return true
        }
        if (targetInCancelAttackRange() === false) {
            turnOffAutoAttack(StopReason.MOVING)
        }
    } else if (isMoving()) {
        return false
    }
    initTimer("TimerCheckAttack", 0.1, true)
}

function timerDistanceScan() {
    const state = getState()
    if (state === AIState.HALTED || state === AIState.HARDIDLE) {
        return
    }
    if (state === AIState.STANDING || state === AIState.IDLE) {
        const target = getTargetOrFindTargetInAcR()
        if (target !== undefined && canSeeMe(target)) {
            setStateAndCloseToTarget(AIState.SOFTATTACK, target)
            return true
        }
    }
    if (state === AIState.MOVE && isMovementStopped()) {
        const target = getTargetOrFindTargetInAcR()
        if (target !== undefined && canSeeMe(target)) {
            setStateAndCloseToTarget(AIState.SOFTATTACK, target)
            turnOnAutoAttack(target)
            return true
        }
        netSetState(AIState.IDLE)
        return false
    }
    if (state === AIState.ATTACKMOVE) {
        const target = getTargetOrFindTargetInAcR()
        if (target !== undefined) {
            setStateAndCloseToTarget(AIState.SOFTATTACK, target)
            return true
        } else if (distanceBetweenObjectAndTargetPosSq(me) <= 100) {
            netSetState(AIState.STANDING)
            clearTargetPosInPos()
            return true
        }
    }
    if (state === AIState.ATTACK_GOING_TO_LAST_KNOWN_LOCATION) {
        const target = getLostTargetIfVisible()
        if (target !== undefined) {
            setStateAndCloseToTarget(AIState.HARDATTACK, target)
        }
    }
}

function onAICommand(textToSay: string, unk: unknown) {
    if (getState() === AIState.HALTED) {
        return
    }
    say(textToSay)
}

function onReachedDestinationForGoingToLastLocation() {
    if (getState() === AIState.HALTED) {
        return
    }
    netSetState(AIState.IDLE)
    timerDistanceScan()
    timerCheckAttack()
}

function haltAI() {
    stopTimer("TimerDistanceScan")
    stopTimer("TimerCheckAttack")
    stopTimer("TimerFeared")
    turnOffAutoAttack(StopReason.IMMEDIATELY)
    netSetState(AIState.HALTED)
}
