import { BuffScript, BuffScriptMetadata, type float } from "../../api"
import * as API from "../../api"

export class PositiveChampionDelta extends BuffScript
{
    public static override metadata = new BuffScriptMetadata({
        persistsThroughDeath: true,
    })

    startTime: float = 0
    
    public override onActivate(){
        this.startTime = API.getGameTime()
    }
    
    public override onUpdateStats()
    {
        const currentTime: float = API.getGameTime()
        const timeDelta: float = Math.min(currentTime - this.startTime, 90)
        const timePercent: float = timeDelta / 90
        const percentBonus = 0.1 * timePercent
        API.incPercentRespawnTimeMod(this.unit, percentBonus)
        const expPercentBonus = 0.05 * timePercent
        API.incPercentEXPBonus(this.unit, expPercentBonus)
    }
}