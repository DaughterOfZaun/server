import { createCipheriv, createDecipheriv } from 'crypto'
//import Blowfish from 'blowfish-node'

//const buffer = Buffer.from('19 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 06 34 90 42 62 10 50 ca 73 e2 4b 69 d2'.split(' ').map(s => parseInt('0x' + s, 16)))
// const buffer = Buffer.from([...'1900000000000000000000000000000000BB3B05420AD77141E00A1C0000'.matchAll(/../g)].map(s => parseInt('0x' + s, 16)))
// console.log(buffer)
// // for(let i = 0; i < buffer.length - 4; i++)
// //     console.log(i, buffer.readFloatLE(i))
// console.log(17, buffer.readFloatLE(17))
// console.log(21, buffer.readFloatLE(21))
// process.exit()

// const padding = [
//     Buffer.from([]),
//     Buffer.from([ 0, 0, 0, 0, 0, 0, 0 ]),
//     Buffer.from([ 0, 0, 0, 0, 0, 0 ]),
//     Buffer.from([ 0, 0, 0, 0, 0 ]),
//     Buffer.from([ 0, 0, 0, 0 ]),
//     Buffer.from([ 0, 0, 0 ]),
//     Buffer.from([ 0, 0 ]),
//     Buffer.from([ 0 ]),
// ]

const key = Buffer.from('17BLOhi6KZsTtldTsizvHg==', 'base64')

// const bf = new Blowfish(key, Blowfish.MODE.ECB, Blowfish.PADDING.NULL)
// function encrypt(buffer: Buffer){
//     return Buffer.from(bf.encode(buffer).slice(0, buffer.length))
// }
// function decrypt(buffer: Buffer){
//     const padded_buffer = Buffer.concat([ buffer, padding[buffer.length % 8]! ])
//     return Buffer.from(bf.decode(padded_buffer, Blowfish.TYPE.UINT8_ARRAY).slice(0, buffer.length))
// }

export function encrypt(buffer: Buffer){

    if(buffer.length < 8) return buffer

    const cipher = createCipheriv('bf-ecb', key, 'anything').setAutoPadding(false)
    const reminder = buffer.length % 8

    if(!reminder) return cipher.update(buffer)

    const delimiter = buffer.length - reminder
    return Buffer.concat([
        cipher.update(buffer.subarray(0, delimiter)),
        buffer.subarray(delimiter),
    ])
}

export function decrypt(buffer: Buffer){

    if(buffer.length < 8) return buffer
    
    const decipher = createDecipheriv('bf-ecb', key, 'anything').setAutoPadding(false)
    const reminder = buffer.length % 8
    
    if(!reminder) return decipher.update(buffer)

    const delimiter = buffer.length - reminder
    let data = Buffer.concat([
        decipher.update(buffer.subarray(0, delimiter)),
        buffer.subarray(delimiter),
    ])
    return data
}

// const Blowfish = {
//     encipher: (data: Buffer) => {
//         let cipher = createCipheriv('bf-ecb', key, 'anything').setAutoPadding(false);
//         let pad = padding[data.length % 8]!
//         data = cipher.update(Buffer.concat([ data, pad ]));
//         return data;
//     },
//     decipher: (data: Buffer) => {
//         let decipher = createDecipheriv('bf-ecb', key, 'anything').setAutoPadding(false);
//         let pad = padding[data.length % 8]!
//         data = Buffer.concat([
//             decipher.update(data), decipher.update(pad), decipher.final()
//         ]);
//         return data;
//     }
// }

// const expectedEncrypted = Buffer.from([ 0x16, 0x6a, 0xdf, 0x67, 0x50, 0xb9, 0x27, 0xf6 ])
// console.log('enc!', expectedEncrypted)
// const expectedUnencrypted = Buffer.alloc(8)
// expectedUnencrypted.writeBigUInt64BE(72057594037927936n)
// console.log('dec!', expectedUnencrypted)
// //const encrypted = Blowfish.encipher(expectedUnencrypted)
// const encrypted = Blowfish.encipher(Buffer.concat([expectedUnencrypted, Buffer.from([ 1, 2, 3 ])]))
// console.log('enc?', encrypted)
// const decrypted = Blowfish.decipher(encrypted)
// console.log('dec?', decrypted)
// process.exit()
