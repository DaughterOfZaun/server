import * as PKT from "../../../net/pkt";
import type { Frame } from "../../frame";
import { System } from "../../system";

export class AISystem extends System {
    public override update(frame: Frame){
        for(const unit of frame.units){
            unit.ai?.update(frame.delta)
        }
        const orders = frame.packets.filter(packet => packet instanceof PKT.NPC_IssueOrderReq)
        for(const order of orders){
            const unit = frame.units.find(unit => unit.netID == order.senderNetID)
            const order_target = frame.units.find(unit => unit.netID == order.targetNetID)
            unit?.ai?.order(order.order, order.pos, order_target, order.data.waypoints)
        }
    }
}
