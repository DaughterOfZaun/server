import { cache } from "../../../cache"
import { Component } from "../../component"

export class DataComponent extends Component {
    
    private _skin: string = ''
    public get skin(){ return this._skin }
    private _skinID: number = 0
    public get skinID(){ return this._skinID }

    push(skin: string, skinID: number, full: boolean){

        const data = cache.characters[skin.toLowerCase()]!
        console.assert(data != undefined)
        
        this._skin = skin
        this._skinID = skinID
        
        this.unit.stats?.load(data)
        if(full){
            this.unit.passive?.load(skin)
            this.unit.spells?.load(data)
        }
    }
}
