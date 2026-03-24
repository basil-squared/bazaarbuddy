import "server-only";

import { Redis } from "@upstash/redis";
import {
  getAllBazaarPriceData,
  getItemNamesAndIDs,
} from "../servapi/HypixelAPI";

export function initializeRedis() {
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}
export async function prepareBazaarDataForRedis(): Promise<RedisBazaarHash> {
  const redisRet: RedisBazaarHash = {};

  const bazaarData: HypixelBazaarResponse = await getAllBazaarPriceData();
  const bazaarEntries = Object.entries(bazaarData.products);
  bazaarEntries.forEach(([productkey, productval]) => {
    if (!productval.quick_status) {
      throw new Error(`Quick status not found in item ID: ${productkey}`);
    }
    redisRet[productkey] = JSON.stringify({
      sellPrice: productval.quick_status.sellPrice,
      buyPrice: productval.quick_status.buyPrice,
    });
  });
  return redisRet;
}

export async function writeRedisData() {
  const redis = initializeRedis();

  // Initiate concurrent fetches to avoid waterfalls
  const [bazaarResults, itemResults] = await Promise.all([
    prepareBazaarDataForRedis(),
    getItemNamesAndIDs(),
  ]);

  //  stop the pipeline if we received partial or empty data
  if (!bazaarResults || !itemResults) {
    throw new Error("Critical: Hypixel API returned null or invalid data.");
  }

  const pipeline = redis.pipeline();

  // Atomic wipe and refill to ensure we never serve ghost items
  pipeline.del("hypixel:bazaar", "hypixel:items");
  pipeline.hset("hypixel:bazaar", bazaarResults);
  pipeline.set("hypixel:items", JSON.stringify(itemResults));

  // Short TTL ensures that we get 'no data' rather than stale data, which is important when things are moving so fast
  pipeline.expire("hypixel:bazaar", 90);
  pipeline.expire("hypixel:items", 90);
  // SHIP IT
  await pipeline.exec();
}

export async function fetchItemDataFromCache(): Promise<HypixelItemsResponse> {
  const redis = initializeRedis();
  const data = (await redis.get("hypixel:items")) as string;
  if (!data) {
    throw new Error("Failed to fetch or parse data.");
  }
  const retResponse: HypixelItemsResponse = JSON.parse(data);

  return retResponse;
}
