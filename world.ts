import { LookAtType, Teams, type BasePacket } from "./net/pkt";
import { vec2, Vector3 } from "./math"
import { assign, send } from './index'
import * as PKT from "./net/pkt"

class Entity {
    id: number = 0
    public reset(){}
    public from(entity: Entity){}
}

class Hero extends Entity {
    name: string = ''

    team: Teams = Teams.Order
    
    skin: string = ''
    skinID: number = 0

    public spawn(){
        
        send(new PKT.S2C_CreateHero(), {
            netObjID: 1073741877,
            playerUID: 0,
            netNodeID: 64,
            skillLevel: 0,
            teamIsOrder: true,
            isBot: false,
            botRank: 0,
            spawnPosIndex: 0,
            skinID: 0,
            name: "Sylanata",
            skin: "Jax",
        })

        send(new PKT.OnEnterVisiblityClient(), {
            items: [],
            lookAtType: LookAtType.None,
            lookAtPosition: Vector3.Zero,
            movementData: assign(new PKT.MovementDataStop(), {
                position: vec2(35.9028, 273.5519),
                forward: vec2(0, 1),
                syncID: 0,
            }),
            senderNetID: 1073741877,
        })
    }
}

class Frame {
    packets: BasePacket[] = []
    entities: Entity[] = []
    public reset(){
        this.packets.length = 0
        this.entities.length = 0
    }
    public from(frame: Frame){
        const t = this.entities
        this.entities = frame.entities
        frame.entities = t
    }
}

class CircularArray<T extends { reset: () => void, from: (prev: T) => void }> {
    elements: T[] = []
    index: number = 0
    constructor(readonly past: number, readonly future: number, ctr: () => T){
        for(let i = 0; i < past + 1 + future; i++){
            this.elements.push(ctr())
        }
    }
    public get(index: number): T {
        console.assert(index >= this.index - this.past)
        console.assert(index <= this.index + this.future)
        return this.elements[index % this.elements.length]!
    }
    public current(){
        return this.get(this.index)
    }
    public next(){
        this.index++
        this.get(this.index + this.future).reset()
        const past = this.get(this.index - 1)
        const present = this.current()
        present.from(past)
        return present
    }
    public peek(){
        return this.get(this.index + 1)
    }
}

export class World {
    frames = new CircularArray(17, 15, () => new Frame())
    public spawn(){
        const frame = this.frames.current()
        const hero = new Hero()
        frame.entities.push(hero)
        hero.spawn()
    }
    public input(packet: BasePacket){
        const frame = this.frames.peek()
        frame.packets.push(packet)
    }
    public tick(){
        this.frames.next()
    }
}