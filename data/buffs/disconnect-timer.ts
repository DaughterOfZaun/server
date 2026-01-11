import { BuffAddType, BuffScript, BuffType, SpellSlotType, TeamId, type Damage, type Minion, type ObjAIBase } from "../../api"
import * as API from "../../api"

import { DisconnectTarget } from "./disconnect-target"

export class DisconnectTimer extends BuffScript {

    public override onReconnect(){
        API.spellBuffRemove(this.unit, DisconnectTimer)
    }
    
    public override onActivate(){
        API.spellCast(this.unit, this.unit, this.unit.position, this.unit.position, 6, SpellSlotType.InventorySlots, 1, true, false, false, false, false, false)
    }

    public override onUpdateStats(){
        if (this.lifeTime >= 60){
            API.incFlatSpellBlockMod(this.unit, 1000)
        }
    }
    
    public override onTakeDamage(attacker: ObjAIBase, damage: Damage){
        const teamID: TeamId = API.getTeamID(this.unit)
        const other1: Minion = API.spawnMinion("RunToMe", "TestCube", "idle.lua", this.unit.position, teamID, false, false, false, true, false, true, 0, undefined, true)
        API.spellBuffAdd(this.unit, other1, new DisconnectTarget(), 1, 1, 1, BuffAddType.REPLACE_EXISTING, BuffType.INTERNAL, 0, true, false, false)
    }

    public override preload()
    {
        API.preloadCharacter("testcube")
        API.preloadSpell("disconnecttarget")
    }
}