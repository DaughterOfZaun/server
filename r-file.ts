import { div, getBitFlagLE, vec2, vec3, vec4, Vector2, Vector3, Vector4 } from "./math";
import type { Reader } from "./net/enet";
import { BasePacket } from "./net/pkt";

export type Value = boolean | number | Vector2 | Vector3 | Vector4 | string

enum Type {
    Begin = 0,
    
    Int32 = 0,
    Float32 = 1,
    Float8 = 2,
    Int16 = 3,
    Byte = 4,
    Bool = 5,
    Float8Vector3 = 6,
    Float32Vector3 = 7,
    Float8Vector2 = 8,
    Float32Vector2 = 9,
    Float8Vector4 = 10,
    Float32Vector4 = 11,
    String = 12,

    End = 13,

    FixedPointFlags =
        (1 << Float8) |
        (1 << Float8Vector2) |
        (1 << Float8Vector3) |
        (1 << Float8Vector4)
}

function hashStringSDBM(section: string, key: string){
    return hashStringNorm(section + '*' + key);
}
function hashStringNorm(str: string){
    let hash = 0
    str = str.toLowerCase()
    for (var i = 0; i < str.length; i++)
        hash = (str.charCodeAt(i) + (65599 * hash)) >>> 0
    return hash
}

export class RFile extends BasePacket {

    //version: number = 0
    private data = new Map<number, Value>()
    //private data = new Map<number, { value: Value, isFixedPoint: boolean }>()
    
    //private accessed = new Set<number>()
    public get(section: string, key: string, floatingPointHint: boolean){
        const hash = hashStringSDBM(section, key)
        const result = this.data.get(hash)
        if(result == undefined) return undefined
        //this.accessed.add(hash)
        return result
        
        //let { value, isFixedPoint } = result
        //if(isFixedPoint && floatingPointHint){
        //    switch(typeof value){
        //        case 'number': value /= 10; break
        //        case 'bigint': value = div(value as Vector4, 10); break
        //    }
        //}
        //if(isFixedPoint)
        //    console.log('is fixed point', key, value)
        
        //return value
    }
    public reportUnused(){
        //const unused = new Set(this.data.keys()).difference(this.accessed)
        //if(unused.size > 0){
        //    const entries = unused.values().map(key => [ key, this.data.get(key) ])
        //    const obj = Object.fromEntries(entries)
        //    console.log('Unused entries', obj)
        //}
    }
    
    public override _read(reader: Reader){
        const version = reader.readByte()
        console.assert(version == 2)

        reader.readBytes(2)
        
        const flags = reader.readUInt16()
        for(let type = Type.Begin; type < Type.End; type++){
            if((flags & (1 << type)) == 0) continue
            
            const count = reader.readUInt16()

            const sizeof_hash = 4
            const sizeof_string_offset = 2

            let lastHashEndPosition = reader.position
            let lastValueEndPosition = reader.position + sizeof_hash * count
            let stringsBeginPosition = reader.position + sizeof_hash * count + sizeof_string_offset * count

            let bitArray: Buffer | null = null

            for(let i = 0; i < count; i++){

                reader.position = lastHashEndPosition
                const hash = reader.readUInt32()
                lastHashEndPosition = reader.position
            
                reader.position = lastValueEndPosition
                let value!: Value
                switch(type){
                    case Type.Int32: value = reader.readInt32(); break
                    case Type.Float32: value = reader.readFloat(); break
                    case Type.Byte: value = reader.readSByte(); break
                    case Type.Int16: value = reader.readInt16(); break
                    case Type.Float8: value = reader.readSByte() * 0.1; break
                    case Type.Bool:
                        bitArray ??= reader.readBytes(Math.ceil(count / 8))
                        value = getBitFlagLE(bitArray, i)
                    break
                    case Type.Float8Vector3: value = Vector3.readFixed(reader, 0.1); break
                    case Type.Float32Vector3: value = Vector3.read(reader); break
                    case Type.Float8Vector2: value = Vector2.readFixed(reader, 0.1); break
                    case Type.Float32Vector2: value = Vector2.read(reader); break
                    case Type.Float8Vector4: value = Vector4.readFixed(reader, 0.1); break
                    case Type.Float32Vector4: value = Vector4.read(reader); break
                    case Type.String:
                        const offset = reader.readUInt16()
                        const prevPosition = reader.position
                        reader.position = stringsBeginPosition + offset
                        value = reader.readString()
                        reader.position = prevPosition
                    break
                }
                lastValueEndPosition = reader.position

                this.data.set(hash, value)
                //const isFixedPoint = ((1 << type) & Type.FixedPointFlags) != 0
                //this.data.set(hash, { value, isFixedPoint })
            }
        }
    }
}
