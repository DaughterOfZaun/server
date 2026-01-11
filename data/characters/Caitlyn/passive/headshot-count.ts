import { BuffAddType, BuffScript, BuffScriptMetadata, BuffType, type int } from "../../../../api"
import { CaitlynHeadshot } from "./headshot"
import * as API from "../../../../api"

export class CaitlynHeadshotCount extends BuffScript {
    
    public static override metadata = new BuffScriptMetadata({
        buffName: "CaitlynHeadshotCount",
        buffTextureName: "Caitlyn_Headshot.dds",
    })

    public override onActivate(){
        const count: int = API.getBuffCountFromCaster(this.unit, this.unit, CaitlynHeadshotCount)
        if (count >= this.charVars.tooltipAmount){
            API.spellBuffAdd(this.unit, this.unit, new CaitlynHeadshot(), 1, 1, 25000, BuffAddType.REPLACE_EXISTING, BuffType.COMBAT_ENCHANCER, 0, true, false, false)
            API.spellBuffRemoveStacks(this.unit, this.unit, CaitlynHeadshotCount, 0)
        }
    }

    public override preload(){
        API.preloadSpell("caitlynheadshotcount")
        API.preloadSpell("caitlynheadshot")
    }
}
