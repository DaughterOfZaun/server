import { AIComponent } from "../../ecf/systems/ai/component"
import { AIState, LostReason, Orders, StopReason } from "../../ecf/systems/ai/shared"
import { BuffType } from "../../ecf/systems/buffs/shared"
import type { Unit } from "../../ecf/unit"
import { makeWanderPoint } from "../../math"

const FEAR_WANDER_DISTANCE = 500

export class HeroAI extends AIComponent {

    protected calculateAttackTimer() {
        let checkAttackTimer = 1.6 / (this.getPercentAttackSpeedMod() + 1)
        if (checkAttackTimer < 0.5) {
            checkAttackTimer = 0.5
        }
        return checkAttackTimer
    }

    protected override onInit() {
        this.clearTargetPosInPos()
        this.setState(AIState.IDLE)
        this.initTimer(this.timerDistanceScan, 0.2, true)
        this.initTimer(this.timerCheckAttack, 0.2, true)
        this.initTimer(this.timerFeared, 1, true)
        this.stopTimer(this.timerFeared)
        return false
    }

    protected override onOrder(order: Orders, target?: Unit) {
        const state = this.getState()
        if (state == AIState.HALTED) {
            return false
        }
        if (state == AIState.TAUNTED || state == AIState.FEARED || state == AIState.CHARMED) {
            return false
        }
        if (order == Orders.TAUNT) {
            console.assert(target != undefined)
            this.setStateAndCloseToTarget(AIState.HARDATTACK, target!)
            this.clearTargetPosInPos()
            return true
        }
        if (order == Orders.ATTACKTO) {
            console.assert(target != undefined)
            this.setStateAndCloseToTarget(AIState.HARDATTACK, target!)
            this.assignTargetPosInPos()
            if (this.targetInAttackRange() == true) {
                const target = this.getTarget()!
                console.assert(target != undefined)
                this.turnOnAutoAttack(target)
            } else {
                this.turnOffAutoAttack(StopReason.MOVING)
            }
            return true
        }
        if (order == Orders.ATTACKMOVE) {
            const newTarget = this.findTargetInAcR()
            if (newTarget !== undefined) {
                this.setStateAndCloseToTarget(AIState.SOFTATTACK, newTarget)
                return true
            }
            this.setStateAndMoveInPos(AIState.ATTACKMOVE)
            this.assignTargetPosInPos()
            return true
        }
        if (order == Orders.MOVETO) {
            this.setStateAndMoveInPos(AIState.MOVE)
            this.assignTargetPosInPos()
            return true
        }
        this.timerCheckAttack()
        return false
    }

    protected override onTargetLost(reason: LostReason, target: Unit) {
        const state = this.getState()
        if (state == AIState.HALTED) {
            return
        }
        if (AIState.ATTACK_GOING_TO_LAST_KNOWN_LOCATION !== state) {
            if (
                reason == LostReason.LOST_VISIBILITY &&
                state !== AIState.SOFTATTACK &&
                target !== undefined
            ) {
                this.setStateAndCloseToTarget(AIState.ATTACK_GOING_TO_LAST_KNOWN_LOCATION, target)
            } else {
                this.timerCheckAttack()
            }
        }
    }

    protected override onTauntBegin() {
        if (this.getState() == AIState.HALTED) {
            return
        }
        const tauntTarget = this.getTauntTarget()
        if (tauntTarget !== undefined) {
            this.setStateAndCloseToTarget(AIState.TAUNTED, tauntTarget)
        }
    }

    protected override onTauntEnd() {
        if (this.getState() == AIState.HALTED) {
            return
        }
        const tauntTarget = this.getTauntTarget()
        if (tauntTarget !== undefined) {
            this.setStateAndCloseToTarget(AIState.SOFTATTACK, tauntTarget)
        } else {
            this.netSetState(AIState.IDLE)
            this.timerDistanceScan()
            this.timerCheckAttack()
        }
    }

    protected override onFearBegin() {
        if (this.getState() == AIState.HALTED) {
            return
        }
        const wanderPoint = makeWanderPoint(this.getFearLeashPoint(), FEAR_WANDER_DISTANCE)
        this.setStateAndMove(AIState.FEARED, wanderPoint)
        this.turnOffAutoAttack(StopReason.MOVING)
        this.resetAndStartTimer(this.timerFeared)
    }

    protected override onFearEnd() {
        if (this.getState() == AIState.HALTED) {
            return
        }
        this.stopTimer(this.timerFeared)
        this.netSetState(AIState.IDLE)
        this.timerDistanceScan()
        this.timerCheckAttack()
    }

    protected timerFeared() {
        if (this.getState() == AIState.HALTED) {
            return
        }
        const wanderPoint = makeWanderPoint(this.getFearLeashPoint(), FEAR_WANDER_DISTANCE)
        this.setStateAndMove(AIState.FEARED, wanderPoint)
    }

    protected override onCharmBegin() {
        if (this.getState() == AIState.HALTED) {
            return
        }
        this.netSetState(AIState.CHARMED)
        this.turnOffAutoAttack(StopReason.IMMEDIATELY)
        this.timerCheckAttack()
    }

    protected override onCharmEnd() {
        if (this.getState() == AIState.HALTED) {
            return
        }
        this.netSetState(AIState.IDLE)
        this.timerDistanceScan()
        this.timerCheckAttack()
    }

    protected override onStopMove() {
        if (this.getState() == AIState.HALTED) {
            return
        }
        this.clearTargetPosInPos()
    }

    protected timerCheckAttack() {
        const state = this.getState()
        if (state == AIState.HALTED) {
            return
        }
        if (
            state == AIState.SOFTATTACK ||
            state == AIState.HARDATTACK ||
            state == AIState.TAUNTED ||
            state == AIState.CHARMED
        ) {
            if (this.isTargetLost() == true || this.getTarget() == undefined) {
                if (this.lastAutoAttackFinished() == false) {
                    this.initTimer(this.timerCheckAttack, 0.1, true)
                    return false
                }
                const newTarget = this.findTargetInAcR()
                if (newTarget !== undefined) {
                    if (state == AIState.CHARMED) {
                        this.setStateAndCloseToTarget(AIState.CHARMED, newTarget)
                    } else if (this.canSeeMe(newTarget)) {
                        this.setStateAndCloseToTarget(AIState.SOFTATTACK, newTarget)
                    }
                    return true
                } else {
                    if (state == AIState.CHARMED) {
                        this.spellBuffRemoveType(this.me, BuffType.TAUNT)
                    }
                    this.netSetState(AIState.STANDING)
                    return true
                }
                //return true
            }
            if (this.targetInAttackRange() == true) {
                const target = this.getTarget()!
                console.assert(target != undefined)
                this.turnOnAutoAttack(target)
                return true
            }
            if (this.targetInCancelAttackRange() == false) {
                this.turnOffAutoAttack(StopReason.MOVING)
            }
        } else if (this.isMoving()) {
            return false
        }
        this.initTimer(this.timerCheckAttack, 0.1, true)
    }

    protected timerDistanceScan() {
        const state = this.getState()
        if (state == AIState.HALTED || state == AIState.HARDIDLE) {
            return
        }
        if (state == AIState.STANDING || state == AIState.IDLE) {
            const target = this.getTargetOrFindTargetInAcR()
            if (target !== undefined && this.canSeeMe(target)) {
                this.setStateAndCloseToTarget(AIState.SOFTATTACK, target)
                return true
            }
        }
        if (state == AIState.MOVE && this.isMovementStopped()) {
            const target = this.getTargetOrFindTargetInAcR()
            if (target !== undefined && this.canSeeMe(target)) {
                this.setStateAndCloseToTarget(AIState.SOFTATTACK, target)
                this.turnOnAutoAttack(target)
                return true
            }
            this.netSetState(AIState.IDLE)
            return false
        }
        if (state == AIState.ATTACKMOVE) {
            const target = this.getTargetOrFindTargetInAcR()
            if (target !== undefined) {
                this.setStateAndCloseToTarget(AIState.SOFTATTACK, target)
                return true
            } else if (this.distanceBetweenObjectAndTargetPosSq(this.me) <= 100) {
                this.netSetState(AIState.STANDING)
                this.clearTargetPosInPos()
                return true
            }
        }
        if (state == AIState.ATTACK_GOING_TO_LAST_KNOWN_LOCATION) {
            const target = this.getLostTargetIfVisible()
            if (target !== undefined) {
                this.setStateAndCloseToTarget(AIState.HARDATTACK, target)
            }
        }
    }

    protected override onAICommand(textToSay: string, unk: unknown){
        if (this.getState() == AIState.HALTED) {
            return
        }
        this.say(textToSay)
    }

    protected override onReachedDestinationForGoingToLastLocation() {
        if (this.getState() == AIState.HALTED) {
            return
        }
        this.netSetState(AIState.IDLE)
        this.timerDistanceScan()
        this.timerCheckAttack()
    }

    protected override haltAI() {
        this.stopTimer(this.timerDistanceScan)
        this.stopTimer(this.timerCheckAttack)
        this.stopTimer(this.timerFeared)
        this.turnOffAutoAttack(StopReason.IMMEDIATELY)
        this.netSetState(AIState.HALTED)
    }
}
