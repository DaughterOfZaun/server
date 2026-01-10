import { config } from "../config";
import { Teams, type BasePacket } from "../net/pkt";
import { Hero } from "../objects/hero";
import { assign } from "../utils";
import { CircularArray } from "./circle";
import { Frame } from "./frame";
import { AISystem } from "./systems/ai/system";
import { MovementSystem } from "./systems/movement/system";
import { StatsSystem } from "./systems/stats/system";

const DELTA = 1000 / 30

export let world: World

export class World {

    frames = new CircularArray(17, 15, () => new Frame())
    systems = {
        ai: new AISystem(),
        stats: new StatsSystem(),
        movement: new MovementSystem(),
    }

    public static async init() {
        world = new World()
        await world.init()
    }
    private async init() {
        const frame = this.frames.current()

        let netID = 0x40000000 | 0x35
        for(const player of config.players){
            const hero = new Hero()
            frame.units.push(hero)
            assign(hero, {
                netID: netID++,
                team: player.teamID,
                playerID: player.playerId,
                name: player.name,
            })
            hero.data.push(
                player.skin,
                player.skinID,
                true,
            )
        }

        this.systems.stats.update(frame)
    }

    public spawn(){
        const frame = this.frames.current()
        for(const unit of frame.units){
            if(unit instanceof Hero)
                unit.spawn(0)
        }
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
