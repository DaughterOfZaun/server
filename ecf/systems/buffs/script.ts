import { assign, type bool, type int } from "../../../utils";
import type { BuffType, EffCreate } from "./shared";
import { Script } from "../script";
import type { Unit } from "../../unit";
import type { AdditionResult, AttackableUnit, Spell } from "../../../api";

export class BuffScriptMetadata {
    public readonly buffName: string = ""
    public readonly buffTextureName: string = ""
    public readonly minimapIconTextureName: string = ""
    public readonly minimapIconEnemyTextureName: string = ""
    public readonly popupMessage: string[] = []

    public readonly autoBuffActivateEvent: string = ""
    public readonly autoBuffActivateEffectFlags: EffCreate = 0
    public readonly autoBuffActivateEffect: string[] = []
    public readonly autoBuffActivateAttachBoneName: string[] = []

    public readonly spellToggleSlot: int = 0 // [1-4]

    public readonly nonDispellable: bool = false
    public readonly persistsThroughDeath: bool = false
    public readonly isPetDurationBuff: bool = false
    public readonly isDeathRecapSource: bool = false

    public readonly onPreDamagePriority: int = 0
    public readonly doOnPreDamageInExpirationOrder: bool = false

    constructor(obj: Partial<BuffScriptMetadata>){
        assign(this, obj)
    }
}

export class BuffScript extends Script {
    
    public static readonly metadata?: BuffScriptMetadata

    //protected get lifeTime(){ return this.buff.timeElapsed }
    protected get lifeTime(){ return 0 }

    protected applier!: Unit
    public override init(unit: Unit, applier?: Unit, spell?: Spell){
        super.init(unit, applier, spell)
        this.applier = applier ?? unit
    }

    public onActivate(): void {}
    public onDeactivate(expired: bool): void {}

    public updateBuffs(): void {}
    public onUpdateAmmo(): void {}
    
    public onAllowAdd(attacker: AttackableUnit, type: BuffType, script: BuffScript, maxStack: int, result: AdditionResult): bool {
        return true
    }
}
