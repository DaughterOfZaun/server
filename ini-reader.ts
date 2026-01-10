import { div, getW, getX, getY, getZ, toObject, vec4, type Vector4 } from "./math";
import type { RFile, Value } from "./r-file";

const MAX_ARRAY_ELEMENTS_TO_READ = 16

const floatRegExp = /^[+-]?[0-9.]*$/

type Enum = Record<number, string>
type KeyOf<T> = T[keyof T]

function enumToLowerCase(type: Enum): Record<string, number> {
    return Object.fromEntries(
        Object.entries(type)
            .filter(([ key, value ]) => typeof value === 'number')
            .map(([ key, value ]) => [ key.toLowerCase(), Number(value) ])
    )
}

type Color = Vector4

export class INIReader {

    public section: string = ''
    constructor(
        private readonly rfile: RFile,
    ){}

    readInt(key: string){ return this.read(key, value => this.parseInt(key, value), false) }
    readFloat(key: string){ return this.read(key, value => this.parseFloat(key, value), true) }
    readFlags<T extends Enum>(type: T, key: string){ return this.read(key, value => this.parseFlags(type, key, value), false) }
    readEnum<T extends Enum>(type: T, key: string){ return this.read(key, value => this.parseEnum(type, key,value), false) }
    readString(key: string){ return this.read(key, value => this.parseString(key, value), false) }
    readBool(key: string){ return this.read(key, value => this.parseBool(key, value), false) }
    readVector4(key: string){ return this.read(key, value => this.parseVector4(key, value), true) }
    readVector4i(key: string){ return this.read(key, value => this.parseVector4i(key, value), false) }
    readColor(key: string){ return this.read(key, value => this.parseColor(key, value), true) }
    private read<T>(key: string, callback: (value: Value) => T, floatingPointHint: boolean): T | undefined {
        const value = this.rfile.get(this.section, key, floatingPointHint)
        if(value == undefined || value == '') return undefined
        return callback(value)
    }
    readArray<T>(key: string, callback: (value: string, i: number) => T): T[] | undefined {
        let value = this.rfile.get(this.section, key, false)
        if(value == undefined || value == '') return undefined
        const desc = `readArray("${key}", ${value})`
        switch(typeof value){
            case 'string': return value.split(' ').map(callback)
            default: throw new Error(desc)
        }
    }
    read1DArray<T>(callback: (i: number) => T | undefined): T[] | undefined {
        let result: T[] | undefined
        for(let i = 1; i <= MAX_ARRAY_ELEMENTS_TO_READ; i++){
            const value = callback(i)
            if(value == undefined) continue
            result ??= []
            result[i - 1] = value
        }
        return result
    }
    read2DArray<T>(callback: (i: number, j: number) => T | undefined): T[][] | undefined {
        let result: T[][] | undefined
        for(let i = 1; i <= MAX_ARRAY_ELEMENTS_TO_READ; i++){
            for(let j = 1; j <= MAX_ARRAY_ELEMENTS_TO_READ; j++){
                const value = callback(i, j)
                if(value == undefined) continue
                result ??= []
                result[i - 1] ??= []
                result[i - 1]![j - 1] = value
            }
        }
        return result
    }

    parseInt(key: string, value: Value){
        const desc = `parseInt("${key}", ${value})`
        value = this.parseFloat(key, value)
        console.assert(value % 1 == 0, desc)
        return value | 0
    }
    parseFloat(key: string, value: Value){
        const desc = `parseFloat("${key}", ${value})`
        switch(typeof value){
            case 'string':
                console.assert(floatRegExp.test(value), desc)
                const f = parseFloat(value)
                console.assert(isFinite(f), desc)
                return f
            case 'number': return value
            case 'boolean': return +value
            //case 'bigint': return
            default: throw new Error(desc)
        }
    }
    parseFlags<T extends Enum>(type: T, key: string, value: Value): KeyOf<T> {
        const desc = `parseFlags("${key}", ${value})`
        switch(typeof value){
            case 'string':
                const reversedEnum = enumToLowerCase(type)
                let result = 0
                for(let key of value.split(',')){
                    key = key.trim().toLowerCase()
                    const value = reversedEnum[key]
                    console.assert(value != undefined, desc)
                    result |= value!
                }
                return result as KeyOf<T>
            //case 'number': return
            //case 'boolean': return
            //case 'bigint': return
            default: throw new Error(desc)
        }
    }
    parseEnum<T extends Enum>(type: T, key: string, value: Value): KeyOf<T> {
        const desc = `parseEnum("${key}", ${value})`
        switch(typeof value){
            case 'string':
                const reversedEnum = enumToLowerCase(type)
                value = value.trim().toLowerCase()
                const result = reversedEnum[value]
                console.assert(result != undefined, desc)
                return result as KeyOf<T>
            //case 'number': return
            //case 'boolean': return
            //case 'bigint': return
            default: throw new Error(desc)
        }
    }
    parseString(key: string, value: Value): string {
        const desc = `parseString("${key}", ${value})`
        switch(typeof value){
            case 'string': return value
            //case 'number': return
            //case 'boolean': return
            //case 'bigint': return
            default: throw new Error(desc)
        }
    }
    parseBool(key: string, value: Value): boolean {
        const desc = `parseBool("${key}", ${value})`
        switch(typeof value){
            case 'string':
                value = value.toLowerCase()
                if(value == 'yes' || value == 'true') return true
                if(value == 'no' || value == 'false') return false
                value = this.parseInt(key, value)
                console.assert(value == 0 || value == 1, desc)
                return !!value
            case 'number':
                console.assert(value == 0 || value == 1, desc)
                return !!value
            case 'boolean':
                return value
            //case 'bigint': break
            default: throw new Error(desc)
        }
    }
    parseVector4(key: string, value: Value): Vector4 {
        const desc = `parseVector4("${key}", ${value})`
        switch(typeof value){
            case 'string':
                const s = value.split(' ')
                console.assert(s.length == 4, desc)
                const r = this.parseFloat(`${key}.r`, s[0]!)
                const g = this.parseFloat(`${key}.g`, s[1]!)
                const b = this.parseFloat(`${key}.b`, s[2]!)
                const a = this.parseFloat(`${key}.a`, s[3]!)
                return vec4(r, g, b, a)
            case 'bigint':
                return value as Vector4
            default: throw new Error(desc)
        }
    }
    parseVector4i(key: string, value: Value): Vector4 {
        const desc = `parseVector4i("${key}", ${value})`
        let v = this.parseVector4(key, value)
        console.assert(
            (getX(v) % 1) == 0 &&
            (getY(v) % 1) == 0 &&
            (getZ(v) % 1) == 0 &&
            (getW(v) % 1) == 0,
            desc
        )
        return v
    }
    parseColor(key: string, value: Value): Color {
        const desc = `parseColor("${key}", ${value})`
        let v = this.parseVector4(key, value)
        const { x, y, z, w } = toObject(v)
        console.assert(x >= 0 && y >= 0 && z >= 0 && w >= 0, desc)
        console.assert(x <= 255 && y <= 255 && z <= 255 && w <= 255, desc)
        if(x > 1 || y > 1 || z > 1 || w > 1){
            console.assert((x % 1) == 0 && (y % 1) == 0 && (z % 1) == 0 && (w % 1) == 0, desc)
            v = div(v, 255)
        }
        return v
    }

    begin(){}
    end(){
        this.rfile.reportUnused()
    }
}