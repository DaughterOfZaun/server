import type { int } from "../../../utils";
import { Component } from "../../component";
import type { CharacterData } from "../data/data";
import type { Script } from "../script";

export class Spell {
    cost: number = 0
    level: int = 1
    vars?: SpellVars
    script?: Script
}

export class SpellVars {

}

export class SpellSlot {
    spell?: Spell
}

export class SpellsComponent extends Component {
    
    slots: SpellSlot[] = []
    enabled: number = 0
    
    public get(index: number){
        return this.slots[index]?.spell
    }

    get q(){ return this.get(0)! }
    get w(){ return this.get(1)! }
    get e(){ return this.get(2)! }
    get r(){ return this.get(3)! }
    get d(){ return this.get(4)! }
    get f(){ return this.get(5)! }
    get b(){ return this.get(6)! }

    load(data: CharacterData){}
}
