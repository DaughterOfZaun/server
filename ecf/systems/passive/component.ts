import { index } from "../../../data";
import { Component } from "../../component";
import { CharScript } from "./script";

export class PassiveComponent extends Component {
    private script!: CharScript
    public load(skin: string){
        const passiveName = `CharScript${skin}`
        const script = index[passiveName]!
        console.assert(script != undefined, `${passiveName} not found`)
        const instance = new script()
        console.assert(instance instanceof CharScript, `${passiveName} is instance of ${CharScript.name}`)
        this.script = instance as CharScript
    }
}
