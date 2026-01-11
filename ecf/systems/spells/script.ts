import type { AttackableUnit, ExecutionResult, float, SpellMissile } from "../../../api";
import { assign, type bool, type int } from "../../../utils";
import type { Unit } from "../../unit";
import { Script } from "../script";
import type { Spell } from "./component";

export class SpellScriptMetadata {

    public triggersSpellCasts: bool = false
    //public doesntTriggerSpellCasts: bool = false
    public castingBreaksStealth: bool = false
    public doesntBreakShields: bool = false
    public isDamagingSpell: bool = false
    public notSingleTargetSpell: bool = false
    
    constructor(obj: Partial<SpellScriptMetadata>){
        assign(this, obj)
    }
}

export class SpellScript extends Script {
    public static readonly metadata?: SpellScriptMetadata

    protected get level(){ return this.spell.level }

    protected spell!: Spell
    public override init(unit: Unit, applier: Unit | undefined, spell: Spell){
        super.init(unit, applier, spell)
        this.spell = spell
    }

    //public onMissileUpdate(missileNetworkID: SpellMissile, missilePosition: Vector3){}
    //public onMissileEnd(spell: Spell, missileEndPosition: Vector3){}

    // SPELL SPECIFIC
    public canCast(): bool { return true }
    public selfExecute(): void {}
    public targetExecute(target: AttackableUnit, missileNetworkID: SpellMissile | undefined, result: ExecutionResult){}
    public adjustCastInfo(): void {}
    public adjustCooldown(): float { return NaN }
    public channelingStart(): void {}
    public channelingCancelStop(): void {}
    public channelingSuccessStop(): void {}
    public channelingStop(): void {}
    public channelingUpdateStats(): void {}
    public channelingUpdateActions(): void {}
    public updateTooltip(spellSlot: int): void {}
}
