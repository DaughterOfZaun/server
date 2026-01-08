import { Vector3 } from "../math";
import { Teams } from "../net/pkt";
import type { AutoAttackComponent } from "./systems/aa/component";
import type { AIComponent } from "./systems/ai/component";
import type { BuffComponent } from "./systems/buffs/component";
import type { DataComponent } from "./systems/data/component";
import type { MovementComponent } from "./systems/movement/component";
import type { StatsComponent } from "./systems/stats/component";

export class Unit {

    netID: number = 0
    team: Teams = 0 as Teams
    position: Vector3 = Vector3.Zero
    
    ai?: AIComponent
    aa?: AutoAttackComponent
    data?: DataComponent
    buffs?: BuffComponent
    stats?: StatsComponent
    movement?: MovementComponent

    public reset(){}
    public from(unit: Unit){}
}
