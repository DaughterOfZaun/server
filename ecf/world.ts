import { Teams, type BasePacket } from "../net/pkt";
import { Hero } from "../objects/hero";
import { CircularArray } from "./circle";
import { Frame } from "./frame";
import { AISystem } from "./systems/ai/system";
import { MovementSystem } from "./systems/movement/system";
import { StatsSystem } from "./systems/stats/system";

const DELTA = 1000 / 30

export class World {
    frames = new CircularArray(17, 15, () => new Frame())
    systems = {
        ai: new AISystem(),
        stats: new StatsSystem(),
        movement: new MovementSystem(),
    }
    public spawn(){
        const frame = this.frames.current()

        const hero = new Hero()
        frame.units.push(hero)
        hero.netID = 0x40000000 | 0x35
        hero.team = Teams.Order
        hero.playerID = 0
        hero.stats.level = 0
        hero.stats.movementSpeed = 330
        hero.stats.scaleSkinCoef = 1
        hero.stats.level = 1
        hero.stats.exp = 0xab
        hero.stats.gold = 0xcd
        hero.data.skin = "Jax"
        hero.data.skinID = 0
        hero.name = "Sylanata"
        hero.spawn(0)

        this.systems.stats.update(frame)
    }
    public input(packet: BasePacket){
        const frame = this.frames.peek()
        frame.packets.push(packet)
    }
    public tick(){
        const frame = this.frames.current()
        this.systems.ai.update(frame)
        this.systems.stats.update(frame)
        this.systems.movement.update(frame)
        this.frames.next()
    }
    public spin(){
        setInterval(() => { this.tick() }, DELTA)
    }
}
