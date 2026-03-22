import 'server-only'

import { Redis } from '@upstash/redis'
import { getAllBazaarPriceData } from '../servapi/HypixelAPI'

function initalizeRedis() {
    return new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN
    })
}
export async function prepareBazaarDataForRedis(): Promise<RedisBazaarHash> {
    const redisRet: RedisBazaarHash = {}

    const bazaarData: HypixelBazaarResponse = await getAllBazaarPriceData()
    const bazaarEntries = Object.entries(bazaarData.products)
    bazaarEntries.forEach(([productkey, productval]) => {
        if (!productval.quick_status) {
            throw new Error(`Quick status not found in item ID: ${productkey}`)
        }
        redisRet[productkey] = { sellPrice: productval.quick_status.sellPrice, buyPrice: productval.quick_status.buyPrice }
    })
    return redisRet



}