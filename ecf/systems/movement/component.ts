import type { Vector2, Vector3 } from "../../../math";
import { Component } from "../../component";
import type { Unit } from "../../unit";

export class MovementComponent extends Component {

    targetUnit: Unit | undefined
    targetPosition: Vector3 | undefined
    waypoints: Vector2[] | undefined
    waypointsRequireUpdate = false
    waypointsRequireNotification = false

    teleportID: number = 0
    teleportIDRequiresNotification = false
    //public teleport(){}

    move(position: Vector3){
        this.waypointsRequireUpdate = true
        this.targetUnit = undefined
        this.targetPosition = position
    }
    close(target: Unit){
        this.waypointsRequireUpdate = true
        this.targetUnit = target
        this.targetPosition = undefined
    }
    assign(waypoints: Vector2[]){
        this.waypointsRequireUpdate = false
        this.waypoints = waypoints
        this.waypointsRequireNotification = true
    }
    clear(){
        this.waypoints = undefined
    }

    update(delta: number){
        if(this.waypointsRequireUpdate){
            console.log('Pathfinding is not implemented')
        }
    }
}
