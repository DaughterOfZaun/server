import type { StopReason } from "../ai/shared";
import { Component } from "../../component";
import type { Unit } from "../../unit";

export class AutoAttackComponent extends Component {
    public turnOn(target: Unit){
        console.log(`Method is not implemented: ${ arguments.callee.name }`)
    }
    public turnOff(reason: StopReason){
        console.log(`Method is not implemented: ${ arguments.callee.name }`)
    }
    public isLastFinished(){
        console.log(`Method is not implemented: ${ arguments.callee.name }`)
        return false
    }
}
