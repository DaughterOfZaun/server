// The real values are unknown to me.
export enum SearchTags {
    support = 1 << 0,
    ranged = 1 << 1,
    assassin = 1 << 2,
    stealth = 1 << 3,
    melee = 1 << 4,
    carry = 1 << 5,
    fighter = 1 << 6,
    jungler = 1 << 7,
    recommended = 1 << 8,
    heal = 1 << 9,
    pusher = 1 << 10,
    farmer = 1 << 11,
    tough = 1 << 12,
    stun = 1 << 13,
    haste = 1 << 14,
    mage = 1 << 15,
    root = 1 << 16,
    nuke = 1 << 17,
    tank = 1 << 18,
    snare = 1 << 19,
    disabler = 1 << 20,
    slow = 1 << 21,
    teleport = 1 << 22,
    flee = 1 << 23,
}

export enum Classification {
    Arcane, Deadly, Strong, Hunter
}

// The real values are unknown to me.
export enum Roles {
    Attacker = 1 << 0,
    Brawler = 1 << 1,
    Mage = 1 << 2,
    Tank = 1 << 3,
    Support = 1 << 4,
}

export enum ArmorMaterial {
    Flesh, Stone, Metal, Wood
}
