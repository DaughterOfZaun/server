import type { ReplicationData } from "../../../net/pkt";
import type { Frame } from "../../frame";
import { System } from "../../system";
import * as PKT from '../../../net/pkt'
import { assign } from "../../../utils";
import { client } from "../../../net/client";

export class StatsSystem extends System {
    syncID = 1
    public override update(frame: Frame){
        const datas: ReplicationData[] = []
        for(const unit of frame.units){
            const stats = unit.stats
            if(!stats) continue

            stats.update()
            
            if(!stats.skip[0]){
                const data = assign(new PKT.ReplicationData(), {
                    unitNetID: unit.netID,
                    values: stats.values,
                    skip: stats.skip,
                })
                datas.push(data)
            }
        }
        if(datas.length > 0)
        client.send(new PKT.OnReplication(), {
            syncID: Date.now() & 0x7FFFFFFF,
            datas,
        })
    }
}
