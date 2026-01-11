import { BuffScript, BuffScriptMetadata, LastTimeExecuted, type float, type int } from "../../../../api"
import * as API from "../../../../api"

export class CaitlynHeadshotPassive extends BuffScript
{
    public static override metadata = new BuffScriptMetadata({
        buffName: "Headshot Marker",
        buffTextureName: "Caitlyn_Headshot.dds",
        nonDispellable: true,
        persistsThroughDeath: true,
    })

    lastTooltip: float = 0
    lastTimeExecuted = new LastTimeExecuted()
    effect0: int[] = [ 7, 7, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5 ]

    public override onActivate()
    {
        API.setBuffToolTipVar(1, 8)
        this.lastTooltip = 8
    }
    
    public override onUpdateActions()
    {
        if (API.executePeriodically(10, this.lastTimeExecuted, true))
        {
            const level: int = API.getLevel(this.unit)
            this.charVars.tooltipAmount = this.effect0[level - 1]!
            if (this.charVars.tooltipAmount < this.lastTooltip)
            {
                this.charVars.lastTooltip = this.charVars.tooltipAmount
                const buffTooltip: float = this.charVars.tooltipAmount + 1
                API.setBuffToolTipVar(1, buffTooltip)
            }
        }
    }
}
