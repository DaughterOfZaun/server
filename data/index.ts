import type { Script } from "../ecf/systems/script";
import { APBonusDamageToTowers } from "./buffs/ap-bonus-damage-to-towers";
import { CantAttack } from "./buffs/cant-attack";
import { ChampionChampionDelta } from "./buffs/champion-champion-delta";
import { DisconnectTarget } from "./buffs/disconnect-target";
import { DisconnectTimer } from "./buffs/disconnect-timer";
import { IfHasBuffCheck } from "./buffs/if-has-buff-check";
import { PositiveChampionDelta } from "./buffs/positive-champion-delta";
import { CharScriptCaitlyn } from "./characters/Caitlyn/passive/char-script";
import { CaitlynHeadshot } from "./characters/Caitlyn/passive/headshot";
import { CaitlynHeadshotCount } from "./characters/Caitlyn/passive/headshot-count";
import { CaitlynHeadshotPassive } from "./characters/Caitlyn/passive/headshot-passive";
import { CaitlynPiltoverPeacemaker } from "./characters/Caitlyn/q/piltover-peacemaker";

export const index: Record<string, new() => Script> = {

    APBonusDamageToTowers,
    ChampionChampionDelta,
    PositiveChampionDelta,
    DisconnectTarget,
    DisconnectTimer,
    IfHasBuffCheck,
    CantAttack,

    CharScriptCaitlyn,
    CaitlynHeadshot,
    CaitlynHeadshotCount,
    CaitlynHeadshotPassive,
    CaitlynPiltoverPeacemaker,
}
