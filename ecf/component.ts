import type { Unit } from "./unit";

export abstract class Component {
    constructor(
        protected readonly unit: Unit,
    ){}
}