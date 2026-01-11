import type { INIReader } from "../../../ini-reader";
import { toArray, type Vector4 } from "../../../math";
import { optcall, type bool, type Color, type float, type int } from "../../../utils";
import { PARType } from "../stats/shared";
import { ArmorMaterial, Classification, Roles, SearchTags } from "./shared";

export class CharacterData {

    assetCategory?: string //= "obj"

    //exportGroup("Info")
    championId?: int
    championName?: string
    description?: string
    friendlyTooltip?: string
    enemyTooltip?: string
    lore?: string
    tips?: string
    opposingTips?: string
    classification?: Classification
    roles?: Roles
    searchTags?: SearchTags
    //exportSubgroup("Ranks")
    magicRank?: int
    attackRank?: int
    defenseRank?: int
    difficultyRank?: int
    //exportSubgroup("")
    //exportSubgroup("Flags")
    botEnabled?: bool
    botEnabledMm?: bool
    csEasy?: bool
    csHard?: bool
    csMedium?: bool
    srEasy?: bool
    srMedium?: bool
    //exportSubgroup("")
    //exportGroup("")

    //exportGroup("Ranges")
    attackRange?: float
    chasingAttackRangePercent?: float
    acquisitionRange?: float
    experienceRadius?: float
    gameplayCollisionRadius?: float
    pathfindingCollisionRadius?: float
    perceptionBubbleRadius?: float
    selectionRadius?: float
    selectionHeight?: float
    //exportGroup("")

    //exportGroup("Stats")
    //exportSubgroup("Defense")
    armor?: float
    armorPerLevel?: float
    armorMaterial?: ArmorMaterial
    hitFxScale?: float

    spellBlock?: float
    spellBlockPerLevel?: float

    baseDodge?: float
    levelDodge?: float

    //exportSubgroup("Offense")
    attackSpeed?: float
    attackSpeedPerLevel?: float

    baseDamage?: float
    damagePerLevel?: float

    baseCritChance?: float
    critDamageBonus?: float
    critPerLevel?: float

    baseAbilityPower?: float
    abilityPowerIncPerLevel?: float //:= 0
    baseSpellEffectiveness?: float // 0 or 1.0
    levelSpellEffectiveness?: float
    //exportSubgroup("")

    //exportSubgroup("Health")
    baseHp?: float
    hpPerLevel?: float
    hpRegenPerLevel?: float
    baseFactorHpRegen?: float
    baseStaticHpRegen?: float
    //exportSubgroup("")

    //exportSubgroup("Mana")
    baseMp?: float
    mpPerLevel?: float
    mpRegenPerLevel?: float
    baseFactorMpRegen?: float
    baseStaticMpRegen?: float
    //exportSubgroup("")

    //exportSubgroup("PAR")
    parType?: PARType
    parNameString?: string

    parColor?: Color
    parFadeColor?: Color

    parIncrements?: float
    parMaxSegments?: int

    parDisplayThroughDeath?: bool
    parHasRegenText?: bool
    //exportSubgroup("")

    moveSpeed?: float

    //exportGroup("")

    //exportGroup("Attacks")
    //exportSubgroup("Base")
    weaponMaterial?: string
    baseAttackProbability?: float
    attackDelayCastOffsetPercent?: float
    attackDelayOffsetPercent?: float
    //exportSubgroup("")
    //exportSubgroup("Extra")
    extraAttack?: string[]
    extraAttackProbability?: float[]
    //exportSubgroup("")
    //exportSubgroup("Crit")
    critAttack?: string
    criticalAttack?: string
    critAttackAttackCastDelayOffsetPercent?: float
    critAttackAttackDelayOffsetPercent?: float
    //exportSubgroup("")
    postAttackMoveDelay?: float
    //exportGroup("")

    //exportGroup("Passive", "passive_")
    passive?: int //?
    passiveIcon?: string
    passiveName?: string
    passiveLuaName?: string
    passiveDesc?: string
    passiveLevel?: int[]
    passiveNumEffects?: int
    passiveEffect?: float[]
    passLevDesc?: string[]
    //exportGroup("")

    //exportGroup("Spells")
    spell?: string[]
    spellDesc?: string[]
    spellDisplayName?: string[]
    spellsUpLevels?: int[][] //:= [[1, 3, 5, 7, 9, 11]]
    maxLevels?: int[] //:= [5, 5, 5, 5] or [6, 6, 6, 1]
    extraSpell?: string[]
    delayCastOffsetPercent?: float
    delayTotalTimePercent?: float
    //exportGroup("")

    //exportGroup("Death")
    globalExpGivenOnDeath?: float
    globalGoldGivenOnDeath?: float
    goldGivenOnDeath?: float
    soulGivenOnDeath?: float
    expGivenOnDeath?: float
    //exportGroup("")

    //exportGroup("Flags")
    isMelee?: bool
    neverRender?: bool
    noAutoAttack?: bool
    noHealthBar?: bool
    platformEnabled?: bool
    serverOnly?: bool
    shouldFaceTarget?: bool
    //exportGroup("")

    read(reader: INIReader){

        reader.begin()
        reader.section = 'Data'
        this.abilityPowerIncPerLevel = reader.readFloat(`AbilityPowerIncPerLevel`)
        this.acquisitionRange = reader.readFloat(`AcquisitionRange`)
        this.armor = reader.readFloat(`Armor`)
        this.armorMaterial = reader.readEnum(ArmorMaterial, "ArmorMaterial")
        this.armorPerLevel = reader.readFloat(`ArmorPerLevel`)
        this.assetCategory = reader.readString(`AssetCategory`)
        this.attackDelayCastOffsetPercent = reader.readFloat(`AttackDelayCastOffsetPercent`)
        this.attackDelayOffsetPercent = reader.readFloat(`AttackDelayOffsetPercent`)
        this.attackRange = reader.readFloat(`AttackRange`)
        this.attackRank = reader.readInt(`AttackRank`)
        this.attackSpeed = reader.readFloat(`AttackSpeed`)
        this.attackSpeedPerLevel = reader.readFloat(`AttackSpeedPerLevel`)
        this.baseAbilityPower = reader.readFloat(`BaseAbilityPower`)
        this.baseAttackProbability = reader.readFloat(`baseAttackProbability`)
        this.baseCritChance = reader.readFloat(`BaseCritChance`)
        this.baseDamage = reader.readFloat(`BaseDamage`)
        this.baseDodge = reader.readFloat(`BaseDodge`)
        this.baseFactorHpRegen = reader.readFloat(`BaseFactorHPRegen`)
        this.baseFactorMpRegen = reader.readFloat(`BaseFactorMPRegen`)
        this.baseHp = reader.readFloat(`BaseHP`)
        this.baseMp = reader.readFloat(`BaseMP`)
        this.baseSpellEffectiveness = reader.readFloat(`BaseSpellEffectiveness`)
        this.baseStaticHpRegen = reader.readFloat(`BaseStaticHPRegen`)
        this.baseStaticMpRegen = reader.readFloat(`BaseStaticMPRegen`)
        this.botEnabled = reader.readBool(`BotEnabled`)
        this.botEnabledMm = reader.readBool(`BotEnabledMM`)
        this.championId = reader.readInt(`ChampionId`)
        this.chasingAttackRangePercent = reader.readFloat(`ChasingAttackRangePercent`)
        this.classification = reader.readEnum(Classification, "Classification")
        this.critAttackAttackCastDelayOffsetPercent = reader.readFloat(`critAttackAttackCastDelayOffsetPercent`)
        this.critAttackAttackDelayOffsetPercent = reader.readFloat(`critAttackAttackDelayOffsetPercent`)
        this.critAttack = reader.readString(`CritAttack`)
        this.critDamageBonus = reader.readFloat(`CritDamageBonus`)
        this.criticalAttack = reader.readString(`CriticalAttack`)
        this.critPerLevel = reader.readFloat(`CritPerLevel`)
        this.csEasy = reader.readBool(`CSEasy`)
        this.csHard = reader.readBool(`CSHard`)
        this.csMedium = reader.readBool(`CSMedium`)
        this.damagePerLevel = reader.readFloat(`DamagePerLevel`)
        this.defenseRank = reader.readInt(`DefenseRank`)
        this.delayCastOffsetPercent = reader.readFloat(`DelayCastOffsetPercent`)
        this.delayTotalTimePercent = reader.readFloat(`DelayTotalTimePercent`)
        this.description = reader.readString(`Description`)
        this.difficultyRank = reader.readInt(`DifficultyRank`)
        this.enemyTooltip = reader.readString(`EnemyTooltip`)
        this.experienceRadius = reader.readFloat(`ExperienceRadius`)
        this.expGivenOnDeath = reader.readFloat(`ExpGivenOnDeath`)
        this.extraAttackProbability = reader.read1DArray(i => reader.readFloat(`ExtraAttack${i}_Probability`))
        this.extraAttack = reader.read1DArray(i => reader.readString(`ExtraAttack${i}`))
        this.extraSpell = reader.read1DArray(i => reader.readString(`ExtraSpell${i}`))
        this.friendlyTooltip = reader.readString(`FriendlyTooltip`)
        this.gameplayCollisionRadius = reader.readFloat(`GameplayCollisionRadius`)
        this.globalExpGivenOnDeath = reader.readFloat(`GlobalExpGivenOnDeath`)
        this.globalGoldGivenOnDeath = reader.readFloat(`GlobalGoldGivenOnDeath`)
        this.goldGivenOnDeath = reader.readFloat(`GoldGivenOnDeath`)
        this.hitFxScale = reader.readFloat(`HitFxScale`)
        this.hpPerLevel = reader.readFloat(`HPPerLevel`)
        this.hpRegenPerLevel = reader.readFloat(`HPRegenPerLevel`)
        this.isMelee = reader.readBool(`IsMelee`)
        this.levelDodge = reader.readFloat(`LevelDodge`)
        this.levelSpellEffectiveness = reader.readFloat(`LevelSpellEffectiveness`)
        this.lore = reader.readString(`Lore${1}`)
        this.magicRank = reader.readInt(`MagicRank`)
        this.maxLevels = optcall(reader.readVector4i(`MaxLevels`), toArray)
        this.moveSpeed = reader.readFloat(`MoveSpeed`)
        this.mpPerLevel = reader.readFloat(`MPPerLevel`)
        this.mpRegenPerLevel = reader.readFloat(`MPRegenPerLevel`)
        this.championName = reader.readString(`Name`)
        this.neverRender = reader.readBool(`NeverRender`)
        this.noAutoAttack = reader.readBool(`NoAutoAttack`)
        this.noHealthBar = reader.readBool(`NoHealthBar`)
        this.parColor = reader.readColor(`PARColor`)
        this.parDisplayThroughDeath = reader.readBool(`PARDisplayThroughDeath`)
        this.parFadeColor = reader.readColor(`PARFadeColor`)
        this.parHasRegenText = reader.readBool(`PARHasRegenText`)
        this.parIncrements = reader.readFloat(`PARIncrements`)
        this.parMaxSegments = reader.readInt(`PARMaxSegments`)
        this.parNameString = reader.readString(`PARNameString`)
        this.parType = reader.readEnum(PARType, "PARType")
        this.passiveDesc = reader.readString(`Passive${1}Desc`) //NOTE: PassLev1Desc1 is used instead.
        reader.read1DArray(i => reader.readString(`Passive${i}Desc`)) //NOTE: Ignored.
        this.passiveEffect = reader.read1DArray(j => reader.readFloat(`Passive${1}Effect${j}`))
        reader.read2DArray((i, j) => reader.readFloat(`Passive${i}Effect${j}`)) //NOTE: Ignored.
        this.passiveIcon = reader.readString(`Passive${1}Icon`)
        reader.read1DArray(i => reader.readString(`Passive${i}Icon`)) //NOTE: Ignored.
        this.passiveLevel = reader.read1DArray(j => reader.readInt(`Passive${1}Level${j}`))
        reader.read2DArray((i, j) => reader.readInt(`Passive${i}Level${j}`)) //NOTE: Ignored.
        this.passiveLuaName = reader.readString(`Passive${1}LuaName`)
        reader.read1DArray(i => reader.readString(`Passive${i}LuaName`)) //NOTE: Ignored.
        this.passiveName = reader.readString(`Passive${1}Name`)
        reader.read1DArray(i => reader.readString(`Passive${i}Name`)) //NOTE: Ignored.
        this.passiveNumEffects = reader.readInt(`Passive${1}NumEffects`)
        reader.read1DArray(i => reader.readInt(`Passive${i}NumEffects`)) //NOTE: Ignored.
        this.passive = reader.readInt(`Passive${1}`)
        reader.read1DArray(i => reader.readInt(`Passive${i}`)) //NOTE: Ignored.
        this.passLevDesc = reader.read1DArray(j => reader.readString(`PassLev${1}Desc${j}`)) //TODO: Check.
        reader.read2DArray((i, j) => reader.readString(`PassLev${i}Desc${j}`)) //NOTE: Ignored.
        this.pathfindingCollisionRadius = reader.readFloat(`PathfindingCollisionRadius`)
        this.perceptionBubbleRadius = reader.readFloat(`PerceptionBubbleRadius`)
        this.platformEnabled = reader.readBool(`PlatformEnabled`)
        this.postAttackMoveDelay = reader.readFloat(`PostAttackMoveDelay`)
        this.roles = reader.readFlags(Roles, "Roles")
        this.searchTags = reader.readFlags(SearchTags, "SearchTags")
        this.selectionHeight = reader.readFloat(`SelectionHeight`)
        this.selectionRadius = reader.readFloat(`SelectionRadius`)
        this.serverOnly = reader.readBool(`ServerOnly`)
        this.shouldFaceTarget = reader.readBool(`ShouldFaceTarget`)
        this.soulGivenOnDeath = reader.readFloat(`SoulGivenOnDeath`)
        this.spellDesc = reader.read1DArray(i => reader.readString(`Spell${i}Desc`))
        this.spellDisplayName = reader.read1DArray(i => reader.readString(`Spell${i}DisplayName`))
        this.spell = reader.read1DArray(i => reader.readString(`Spell${i}`))
        this.spellBlock = reader.readFloat(`SpellBlock`)
        this.spellBlockPerLevel = reader.readFloat(`SpellBlockPerLevel`)
        this.spellsUpLevels = reader.read1DArray(i => reader.readArray(`SpellsUpLevels${i}`, (value, j) => reader.parseInt(`SpellsUpLevels[${i}][${j}]`, value)))
        this.srEasy = reader.readBool(`SREasy`)
        this.srMedium = reader.readBool(`SRMedium`)
        this.tips = reader.readString(`Tips${1}`)
        this.opposingTips = reader.readString(`Tips${2}`)
        reader.read1DArray(i => reader.readString(`WeaponMaterial${i}`)) //NOTE: Ignored.
        this.weaponMaterial = reader.readString(`WeaponMaterial`)
        reader.end()

        return this
    }
}