import { BuffScript, type bool } from "../../api";
import * as API from "../../api";

export class CantAttack extends BuffScript {
    public override onActivate(){
        API.setCanAttack(this.unit, false)
    }
    public override onDeactivate(expired: bool){
        API.setCanAttack(this.unit, true);
    }
}
