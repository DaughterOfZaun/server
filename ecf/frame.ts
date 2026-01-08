import type { BasePacket } from "../net/pkt"
import type { Unit } from "./unit"

const DELTA = 1000 / 30

export class Frame {
    packets: BasePacket[] = []
    units: Unit[] = []
    delta: number = 0
    time: number = 0
    public reset(){
        this.packets.length = 0
        this.units.length = 0
        this.time = 0
    }
    public from(frame: Frame){
        
        this.time = frame.time + DELTA
        this.delta = DELTA

        const t = this.units
        this.units = frame.units
        frame.units = t
    }
}
