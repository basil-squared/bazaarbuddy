'use server'

import { getBazaarPriceDataAvg } from "./servapi/HypixelAPI";

export async function getBazaarData(itemId: string) {

    const data = await getBazaarPriceDataAvg(itemId);


    return {
        buy: data.get('BuyAverage') ?? 0,
        sale: data.get('SaleAverage') ?? 0
    };
}