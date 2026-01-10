import { World } from "./ecf/world"
import { Cache } from "./cache"
import { Client } from "./net/client"

await Cache.init()
await World.init()
await Client.init()
