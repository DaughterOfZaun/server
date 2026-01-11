export enum PARType {
    MANA = 0,
    ENERGY = 1,
    SOULS = 2,
    SHIELD = 3,
    OTHER = 4,
}

export enum DamageType {
    PHYSICAL = 0,
    MAGIC = 1,
    TRUE = 2,
    MIXED = 3,
}

export enum DamageSource {
    RAW = 0,
    INTERNALRAW = 1,
    PERIODIC = 2,
    PROC = 3,
    REACTIVE = 4,
    ONDEATH = 5,
    SPELL = 6,
    ATTACK = 7,
    DEFAULT = 8,
    SPELLAOE = 9,
    SPELLPERSIST = 10,
}

export enum HitResult {
    Normal = 0,
    Critical = 1,
    Dodge = 2,
    Miss = 3
}
