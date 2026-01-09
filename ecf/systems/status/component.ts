import { Component } from "../../component";

export class StatusComponent extends Component {

    actionState: number = 0
    isTargetableToTeam: number = 0

    disableAmbientGold: boolean = false
    forceRenderParticles: boolean = false
    ignoreCallForHelp: boolean = false
    noRender: boolean = false
    revealSpecificUnit: boolean = false
    suppressCallForHelp: boolean = false
    isCallForHelpSuppresser: boolean = false
    canAttack: boolean = false
    canCast: boolean = false
    canMove: boolean = false
    isCharmed: boolean = false
    isDisarmed: boolean = false
    isFeared: boolean = false
    isGhosted: boolean = false
    isGhostProof: boolean = false
    isImmovable: boolean = false
    isInvulnerable: boolean = false
    isMagicImmune: boolean = false
    isNearSighted: boolean = false
    isNetted: boolean = false
    isPacified: boolean = false
    isPhysicalImmune: boolean = false
    isRooted: boolean = false
    isSilenced: boolean = false
    isSleeping: boolean = false
    isStealthed: boolean = false
    isStunned: boolean = false
    isSuppressed: boolean = false
    isTargetable: boolean = false
    isTaunted: boolean = false
    isMoving: boolean = false
}