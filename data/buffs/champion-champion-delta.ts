import { BuffAddType, BuffScript, BuffScriptMetadata, BuffType, LastTimeExecuted, TeamId, type int } from "../../api"
import * as API from "../../api"

import { PositiveChampionDelta } from "./positive-champion-delta"

export class ChampionChampionDelta extends BuffScript
{
    public static override metadata = new BuffScriptMetadata({
        nonDispellable: true,
        persistsThroughDeath: true,
    })

    lastTimeExecuted = new LastTimeExecuted()
    
    public override onUpdateStats(){
        if (API.executePeriodically(10, this.lastTimeExecuted, false)){
            const teamID: TeamId = API.getTeamID(this.unit)
            const numAlliedChampions: int = API.getNumberOfHeroesOnTeam(teamID, false, true)
            const numHostileChampions: int = API.getNumberOfHeroesOnTeam(API.getEnemyTeam(teamID), false, true)
            if (numAlliedChampions < numHostileChampions){
                API.spellBuffAdd(this.unit, this.unit, new PositiveChampionDelta(), 1, 1, 21, BuffAddType.RENEW_EXISTING, BuffType.INTERNAL, 0, true, false)
            } else /*if (numAlliedChampions >= numHostileChampions)*/ {
                API.spellBuffClear(this.unit, PositiveChampionDelta)
            }
        }
    }

    public override preload()
    {
        API.preloadSpell("positivechampiondelta")
        API.preloadSpell("negativechampiondelta")
    }
}
