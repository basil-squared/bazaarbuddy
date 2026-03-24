"use server";

import { getBazaarPriceDataAvg } from "./servapi/HypixelAPI";
import { initializeRedis } from "./serverHelpers/redisHelper";

export async function getBazaarData(itemId: string) {
  const data = await getBazaarPriceDataAvg(itemId);

  return {
    buy: data.get("BuyAverage") ?? 0,
    sale: data.get("SaleAverage") ?? 0,
  };
}
export async function getAllItems() {
  const redis = initializeRedis();

  const data = await redis.get<HypixelItem[]>("hypixel:items");

  return data ? data : [];
}
