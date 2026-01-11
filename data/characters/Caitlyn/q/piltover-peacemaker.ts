import { DamageSource, DamageType, HitResult, isObjectHero, SpellScript, SpellScriptMetadata, TeamId, type AttackableUnit, type ExecutionResult, type float, type int, type SpellMissile } from "../../../../api"
import * as API from "../../../../api"

export class CaitlynPiltoverPeacemaker extends SpellScript {
    
    public static override metadata = new SpellScriptMetadata({
        triggersSpellCasts: true,
        isDamagingSpell: true,
        notSingleTargetSpell: true,
    })
    
    effect0: int[] = [ 20, 60, 100, 140, 180 ]
    public override targetExecute(target: AttackableUnit, missileNetworkID: SpellMissile, result: ExecutionResult){
        const teamID: TeamId = API.getTeamID(this.unit)
        result.hitResult = HitResult.Normal
        const percentOfAttack = this.charVars.percentOfAttack
        const baseDamage: float = API.getTotalAttackDamage(this.unit) * 1.3
        if (!API.getStealthed(target) || isObjectHero(target) || API.canSeeTarget(this.unit, target)){
            API.breakSpellShields(target)
            API.spellEffectCreate("caitlyn_peaceMaker_tar_02.troy", undefined, teamID, 10, 0, TeamId.UNKNOWN, undefined, this.unit, false, target, "spine", undefined, this.unit, undefined, undefined, true, false, false, false, false)
            API.applyDamage(this.unit, target, baseDamage + this.effect0[this.level - 1]!, DamageType.PHYSICAL, DamageSource.SPELLAOE, percentOfAttack, 0, 0, false, true, this.unit)
            this.charVars.percentOfAttack *= 0.85
            this.charVars.percentOfAttack = Math.max(this.charVars.percentOfAttack, 0.4)
        }
    }
}