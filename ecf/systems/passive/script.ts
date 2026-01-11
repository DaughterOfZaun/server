import { Script } from "../script"

export class CharScript extends Script {
    
    protected get level(){ return this.unit.stats!.level }
    
    public setVarsByLevel(): void {}
    public onActivate(): void {}
    public onDeactivate(): void {}
}
