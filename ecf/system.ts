import type { Frame } from "./frame";

export abstract class System {
    public abstract update(frame: Frame): void
}
