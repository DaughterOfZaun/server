import type { AttackableUnit, HitDamage, GameObject, ObjAIBase, DeathResult, SpellMissile, int, Damage, float } from "../../api";
import { AvatarVars, CharVars } from "../../data/characters/vars";
import type { Vector3 } from "../../math";
import type { Unit } from "../unit";
import type { Spell, SpellVars } from "./spells/component";

export abstract class Script {

    protected get charVars(){
        return this.unit.vars ??= new CharVars()
    }
    protected get avatarVars(){
        return this.unit.avatar!.vars ??= new AvatarVars()
    }

    protected unit!: Unit
    public init(unit: Unit, applier?: Unit, spell?: Spell){
        this.unit = unit
    }

    public preload(){}

    // UPDATE
    public onUpdateStats(): void {}
    public onUpdateActions(): void {}

    public onDodge(attacker: AttackableUnit): void {}
    public onBeingDodged(target: ObjAIBase): void {}

    // HIT
    public onHitUnit(target: AttackableUnit, damage: HitDamage): void {}
    public onBeingHit(attacker: ObjAIBase, damage: HitDamage): void {}
    public onSpellHit(target: AttackableUnit): void {}
    public onBeingSpellHit(attacker: ObjAIBase, spell: Spell, spellVars: SpellVars): void {}
    public onMiss(target: AttackableUnit): void {}

    public onMoveEnd(): void {}
    public onMoveFailure(): void {}
    public onMoveSuccess(): void {}
    public onCollision(obj: GameObject): void {}
    public onCollisionTerrain(): void {}

    // DEATH
    public onKill(target: AttackableUnit): void {}
    public onAssist(attacker: ObjAIBase, target: AttackableUnit): void {}
    public onDeath(attacker: ObjAIBase, result: DeathResult): void {}
    public onNearbyDeath(attacker: ObjAIBase, target: AttackableUnit): void {}
    public onZombie(attacker: ObjAIBase): void {}
    public onResurrect(): void {}

    // CONNECTION
    public onDisconnect(): void {}
    public onReconnect(): void {}

    // LEVEL
    public onLevelUp(): void {}
    public onLevelUpSpell(slot: int): void {}

    public onPreAttack(target: AttackableUnit): void {}
    public onLaunchAttack(target: AttackableUnit): void {}
    public onLaunchMissile(missileId: SpellMissile): void {}
    public onMissileUpdate(missileNetworkID: SpellMissile, missilePosition: Vector3): void {}
    public onMissileEnd(spellName: string, missileEndPosition: Vector3): void {}

    // DAMAGE
    public onPreDealDamage(target: AttackableUnit, damage: Damage): void {}
    public onPreMitigationDamage(target: AttackableUnit, damage: Damage): void {}
    public onPreDamage(target: AttackableUnit, damage: Damage): void {}

    public onTakeDamage(attacker: ObjAIBase, damage: Damage): void {}
    public onDealDamage(target: AttackableUnit, damage: Damage): void {}

    public onHeal(amount: float): float { return 0 }

    public onSpellCast(spell: Spell, spellVars: SpellVars): void {}
}