import { BuffScript, BuffScriptMetadata, SpellSlotType, type AttackableUnit, type bool } from "../../../../api";
import * as API from "../../../../api";

export class CaitlynHeadshot extends BuffScript
{
    public static override metadata = new BuffScriptMetadata({
        autoBuffActivateAttachBoneName: [ "R_BUFFBONE_GLB_HAND_LOC", "L_BUFFBONE_GLB_HAND_LOC" ],
        autoBuffActivateEffect: [ "caitlyn_headshot_rdy_indicator.troy", "caitlyn_headshot_rdy_indicator.troy" ],
        buffName: "CaitlynHeadshotReady",
        buffTextureName: "Caitlyn_Headshot2.dds",
    })

    public override onActivate(){
        API.setDodgePiercing(this.unit, true)
    }

    public override onDeactivate(expired: bool){
        API.setDodgePiercing(this.unit, false)
    }

    public override onPreAttack(target: AttackableUnit){
        API.removeOverrideAutoAttack(this.unit, false)
        if (API.isObjectAI(target) && !API.isTurretAI(target)){
            API.overrideAutoAttack(2, SpellSlotType.ExtraSlots, this.unit, 1, true)
        }
    }
}