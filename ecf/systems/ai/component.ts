import { client } from "../../../net/client";
import { Vector3, type Vector2 } from "../../../math";
import type { BuffType } from "../buffs/shared";
import { AIState, LostReason, Orders, StopReason } from "./shared";
import * as PKT from '../../../net/pkt'
import type { Unit } from "../../unit";
import { Component } from "../../component";

type OrderArgs = { order: Orders, pos?: Vector3, target?: Unit, waypoints?: Vector2[] }

export class AIComponent extends Component {
    
    private currentOrder: OrderArgs | undefined
    public order(order: Orders, pos?: Vector3, target?: Unit, waypoints?: Vector2[]){
        this.currentOrder = { order, pos, target, waypoints }
        this.onOrder(order, target)
        this.currentOrder = undefined
    }

    public update(delta: number){
        for(const timer of this.timers.values()){
            if(timer.stopped) continue
            if((timer.timePassed += delta) >= timer.timeout){
                timer.timePassed = 0
                timer.callback()
            }
        }
    }
    
    protected onInit(){}
    protected onOrder(order: Orders, target?: Unit){}
    protected onTargetLost(reason: LostReason, target: Unit){}
    protected onTauntBegin(){}
    protected onTauntEnd(){}
    protected onFearBegin(){}
    protected onFearEnd(){}
    protected onCharmBegin(){}
    protected onCharmEnd(){}
    protected onStopMove(){}
    protected onAICommand(textToSay: string, unk: unknown){}
    protected onReachedDestinationForGoingToLastLocation(){}
    protected haltAI(){}
    
    protected get me(){ return this.unit }

    protected assignTargetPosInPos(){
        const waypoints = this.currentOrder?.waypoints!
        console.assert(waypoints != undefined)
        this.unit.movement!.assign(waypoints)
    }
    protected clearTargetPosInPos(){
        this.unit.movement!.clear()
    }

    private state: AIState = AIState.IDLE
    protected getState(){ return this.state }
    protected setState(state: AIState){ this.state = state }
    protected netSetState(state: AIState){
        client.send(new PKT.S2C_AI_State(), { stateID: state })
        this.setState(state)
    }

    protected setStateAndMove(state: AIState, position: Vector3){
        this.unit.movement!.move(position)
        this.setState(state)
    }
    protected setStateAndMoveInPos(state: AIState){
        const position = this.currentOrder?.pos!
        console.assert(position != undefined)
        this.unit.movement!.move(position)
        this.setState(state)
    }
    protected setStateAndCloseToTarget(state: AIState, target: Unit){
        this.unit.movement!.close(target)
        this.setState(state)
    }

    private timers = new Map<string, { callback: () => void, timePassed: number, timeout: number, unk: boolean, stopped: boolean }>
    protected initTimer(callback: () => void, timeout: number, unk: boolean) {
        this.timers.set(callback.name, { callback, timePassed: 0, timeout, unk, stopped: false })
    }
    protected resetAndStartTimer(callback: () => void){
        const timer = this.timers.get(callback.name)!
        timer.stopped = false
        timer.timePassed = 0
    }
    protected stopTimer(callback: () => void){
        this.timers.get(callback.name)!.stopped = true
    }

    private target: Unit | undefined
    protected getTarget(): Unit | undefined { return this.target }
    protected getTargetOrFindTargetInAcR(): Unit | undefined { return this.target || this.findTargetInAcR() }
    protected findTargetInAcR(): Unit | undefined {
        console.log(`Method is not implemented: ${ arguments.callee.name }`)
        return null! as Unit
    }
    protected getLostTargetIfVisible(): Unit | undefined {
        console.log(`Method is not implemented: ${ arguments.callee.name }`)
        return null! as Unit
    }
    protected targetInAttackRange() {
        console.log(`Method is not implemented: ${ arguments.callee.name }`)
        return false
    }
    protected targetInCancelAttackRange() {
        console.log(`Method is not implemented: ${ arguments.callee.name }`)
        return false
    }
    protected isTargetLost() {
        console.log(`Method is not implemented: ${ arguments.callee.name }`)
        return false
    }
    protected distanceBetweenObjectAndTargetPosSq(obj: Unit) {
        console.log(`Method is not implemented: ${ arguments.callee.name }`)
        return 0
    }

    protected getTauntTarget() {
        console.log(`Method is not implemented: ${ arguments.callee.name }`)
        return null! as Unit
    }
    protected getFearLeashPoint() {
        console.log(`Method is not implemented: ${ arguments.callee.name }`)
        return Vector3.Zero
    }

    protected getPercentAttackSpeedMod() {
        console.log(`Method is not implemented: ${ arguments.callee.name }`)
        return 0
    }

    protected say(what: string){
        console.log(what)
    }

    protected turnOnAutoAttack(target: Unit){
        this.unit.aa!.turnOn(target)
    }
    protected turnOffAutoAttack(reason: StopReason){
        this.unit.aa!.turnOff(reason)
    }
    protected lastAutoAttackFinished(){
        return this.unit.aa!.isLastFinished()
    }

    protected canSeeMe(observer: Unit){
        return false
    }

    protected spellBuffRemoveType(target: Unit, type: BuffType){
        console.log(`Method is not implemented: ${ arguments.callee.name }`)
    }

    protected isMoving() {
        console.log(`Method is not implemented: ${ arguments.callee.name }`)
        return false
    }
    protected isMovementStopped() {
        console.log(`Method is not implemented: ${ arguments.callee.name }`)
        return false
    }
}
