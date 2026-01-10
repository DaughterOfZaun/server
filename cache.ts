import fs from 'node:fs/promises'
import path from 'node:path'
import { CharacterData } from './ecf/systems/data/data'
import { RFile } from './r-file'
import { INIReader } from './ini-reader'
import { replacer } from './math'

const paths = function(){
    const client = path.join('..', 'playable_client_126')
    const data = path.join(client, 'DATA')
    const buffs = path.join(data, 'Buffs')
    const characters = path.join(data, 'Characters')
    const globals = path.join(data, 'Globals')
    const items = path.join(data, 'Items')
    const particles = path.join(data, 'Particles')
    const spells = path.join(data, 'Spells')
    const talents = path.join(data, 'Talents')
    const cache = path.join('.', 'cache.json')
    return { buffs, characters, globals, items, particles, spells, talents, cache }
}()

let cache = new class CachedData {
    characters: Record<string, CharacterData> = {}
}

export class Cache {
    public static async load(){
        try {
            cache = JSON.parse(await fs.readFile(paths.cache, 'utf8'))
            return
        } catch(e) {
            // Ignore
        }
        await Promise.all([
            async function loadCharacters(){
                const char_names = await fs.readdir(paths.characters)
                return Promise.all(char_names.map(async char_name => {
                    //if(char_name != 'Caitlyn') return

                    const char_name_lc = char_name.toLowerCase()
                    const dir_path = path.join(paths.characters, char_name)
                    let dir_entries
                    try {
                        dir_entries = await fs.readdir(dir_path)
                    } catch(err) {
                        const exception = err as ErrnoException
                        if(exception.code == 'ENOTDIR') return
                        else throw err
                    }
                    const inibin_name = dir_entries.find(entry => {
                        return entry.toLowerCase() == char_name_lc + '.inibin'
                    })
                    if(!inibin_name){
                        console.log(`No character data found for ${char_name}`)
                        return
                    }
                    const inibin_path = path.join(dir_path, inibin_name)
                    const inibin_content = await fs.readFile(inibin_path)
                    const rfile = new RFile().read(inibin_content)
                    const reader = new INIReader(rfile)
                    const char_data = new CharacterData().read(reader)
                    cache.characters[char_name_lc] = char_data
                }))
            }(),
        ])
        const json = JSON.stringify(cache, replacer, 4)
        await fs.writeFile(paths.cache, json, 'utf8')
        //console.log(json)
    }
}