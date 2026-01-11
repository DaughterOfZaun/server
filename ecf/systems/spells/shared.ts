
export enum SlotType {
    SpellSlots = 0,
    InventorySlots = 1,
    ExtraSlots = 2,
}

export enum SpellbookType {
    SPELLBOOK_CHAMPION = 0,
    SPELLBOOK_SUMMONER = 1,
    SPELLBOOK_UNKNOWN = 2,
}

export enum SpellFlags {
    None = 0,
    Autocast = 2,
    Instacast = 4,
    PersistThroughDeath = 8,
    NonDispellable = 16,
    NoClick = 32,
    AffectUntargetable = 512,
    AffectEnemies = 1024,
    AffectFriends = 2048,
    AffectBuildings = 4096,
    NotAffectSelf = 8192,
    AffectNeutral = 16384,
    AffectsAllSides = 19456,
    AffectMinions = 32768,
    AffectHeroes = 65536,
    AffectTurrets = 131072,
    AffectsAllUnitTypes = 229376,
    AlwaysSelf = 262144,
    AffectDead = 524288,
    AffectNotPet = 1048576,
    AffectBarrackOnly = 2097152,
    IgnoreVisibilityCheck = 4194304,
    NonTargetableAlly = 8388608,
    NonTargetableEnemy = 16777216,
    NonTargetableAll = 25165824,
    TargetableToAll = 33554432,
    AffectWards = 67108864,
    AffectUseable = 134217728
}
