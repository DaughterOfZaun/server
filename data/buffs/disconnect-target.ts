import { BuffScript, DamageSource, DamageType, OrderType, SpawnType, TeamId, type bool } from "../../api"
import * as API from "../../api"

export class DisconnectTarget extends BuffScript {
    
    public override onActivate(){
        API.setNoRender(this.unit, true)
        API.setGhosted(this.unit, true)
        API.setTargetable(this.unit, false)
        API.setSuppressCallForHelp(this.unit, true)
        API.setIgnoreCallForHelp(this.unit, true)
        API.setForceRenderParticles(this.unit, true)
    }

    public override onUpdateActions(){
        const teamID: TeamId = API.getTeamID(this.unit)
        API.teleportToKeyLocation(this.unit, SpawnType.SPAWN_LOCATION, teamID)
        API.issueOrder(this.unit, OrderType.MOVETO, undefined, this.unit)
        API.spellBuffRemove(this.unit, DisconnectTarget)
    }

    public override onDeactivate(expired: bool){
        API.setTargetable(this.unit, true)
        API.applyDamage(this.unit, this.unit, 9999, DamageType.TRUE, DamageSource.INTERNALRAW, 1, 1, 1, false, false, this.unit)
    }
}
