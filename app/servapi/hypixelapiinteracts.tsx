import 'server-only'



export class HypixelAPI {
    private apiKey: string
    constructor() {
        // fetch API key from the env file
        const api_key: string | undefined = process.env.HYPIXEL_API
        // check null to make sure we dont cause any dumbshit errors with it trying to form the api without a key.
        if (!api_key) {
            throw new Error("Hypixel API Key not found in environment. Please notify administrator, and if you are the administrator, please get your shit together!")

        }
        this.apiKey = api_key


    }
    async bazaarPriceDataAvg(item_id: string): Promise<Map<string, number>> {
        var saleMean: number = 0;
        var buyMean: number = 0;

        const bazaarRequest: Response = await fetch("https://api.hypixel.net/v2/skyblock/bazaar", {
            method: 'GET',
            // Forces the cache to refresh itself every minute so we aren't sitting on stale data
            next: { tags: ['bazaar'], revalidate: 60 },
            cache: 'force-cache',
            headers: {
                'Content-Type': 'application/json',
                // api key that should have been fetched from env
                'API-Key': this.apiKey
            }
        })
        // this is a catch all 'something went wrong heres what' kind of thing. 
        if (!bazaarRequest.ok) {
            throw new Error(`Error. Status ${bazaarRequest.status}.`)
        }
        const bazaarData = await bazaarRequest.json()
        if (!bazaarData.success) {
            throw new Error(`Hypixel API Error: ${bazaarData.cause}`);
        }
        const productsData = bazaarData.products
        const itemData = productsData[item_id]
        if (!itemData) {
            throw new Error(`Item ID ${item_id} not found.`)
        }
        saleMean = Math.round(itemData.buyPrice * 10) / 10
        buyMean = Math.round(itemData.sellPrice * 10) / 10


        return new Map<string, number>([
            ['SaleAverage', saleMean],
            ['BuyAverage', buyMean]
        ])

    }
}