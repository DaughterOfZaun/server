import { Vector3 } from "../math";
import type { Teams } from "./systems/shared";
import type { AutoAttackComponent } from "./systems/aa/component";
import type { AIComponent } from "./systems/ai/component";
import type { BuffComponent } from "./systems/buffs/component";
import type { DataComponent } from "./systems/data/component";
import type { MovementComponent } from "./systems/movement/component";
import type { SpellsComponent } from "./systems/spells/component";
import type { StatsComponent } from "./systems/stats/component";
import type { StatusComponent } from "./systems/status/component";
import type { CharVars } from "../data/characters/vars";
import type { Avatar } from "../objects/hero";
import type { PassiveComponent } from "./systems/passive/component";

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
    spells?: SpellsComponent
    status?: StatusComponent
    passive?: PassiveComponent
    avatar?: Avatar
    vars?: CharVars

    public reset(){}
    public from(unit: Unit){}
}
