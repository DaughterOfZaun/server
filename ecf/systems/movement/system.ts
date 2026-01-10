import { client } from "../../../net/client";
import { assign } from "../../../utils";
import type { Frame } from "../../frame";
import { System } from "../../system";
import * as PKT from '../../../net/pkt'

export class MovementSystem extends System {
    syncID = 2
    public override update(frame: Frame){
        const movements: PKT.MovementDataNormal[] = []
        let waypointGroupRequiresNotification = false
        for(const unit of frame.units){
            unit.movement?.update(frame.delta)
            if(unit.movement?.waypointsRequireNotification){
                const movement = new PKT.MovementDataNormal()
                movements.push(movement)
                assign(movement, {
                    teleportNetID: unit.netID,
                    hasTeleportID: unit.movement.teleportIDRequiresNotification,
                    teleportID: unit.movement.teleportID,
                    waypoints: unit.movement.waypoints
                })
                waypointGroupRequiresNotification = true
                unit.movement.waypointsRequireNotification = false
                unit.movement.teleportIDRequiresNotification = false
            }
        }
        if(waypointGroupRequiresNotification){
            waypointGroupRequiresNotification = false
            client.send(new PKT.WaypointGroup(), {
                syncID: Date.now() & 0x7FFFFFFF,
                movements,
            })
        }
    }
}
