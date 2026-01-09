import { getBitFlagLE, vec2, vec3, vec4, Vector2, Vector3, Vector4 } from "./math";
import type { Reader } from "./net/enet";
import { BasePacket } from "./net/pkt";

type Value = boolean | number | Vector2 | Vector3 | Vector4 | string

enum Type {
    Begin = 0,
    
    Int32 = 0,
    Float32 = 1,
    Byte = 2,
    Int16 = 3,
    Float8 = 4,
    Bool = 5,
    Float8Vector3 = 6,
    Float32Vector3 = 7,
    Float8Vector2 = 8,
    Float32Vector2 = 9,
    Float8Vector4 = 10,
    Float32Vector4 = 11,
    String = 12,

    End = 13,
}

export class RFile extends BasePacket {
    version: number = 0
    data = new Map<number, Value>()
    public override _read(reader: Reader){
        this.version = reader.readByte()
        console.assert(this.version == 2)

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
                    case Type.Float8Vector3: value = Vector3.readFixed(reader); break
                    case Type.Float32Vector3: value = Vector3.read(reader); break
                    case Type.Float8Vector2: value = Vector2.readFixed(reader); break
                    case Type.Float32Vector2: value = Vector2.read(reader); break
                    case Type.Float8Vector4: value = Vector4.readFixed(reader); break
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
            }
        }
    }
}
