import 'server-only'

const API_URI_BASE = "https://api.hypixel.net/v2/"


// Lazily fetch the key so it doesn't break instantly on import if env vars load slightly late
function getApiKey(): string {
    const apiKey = process.env.HYPIXEL_API
    if (!apiKey) {
        throw new Error("Hypixel API Key not found in environment. Please notify administrator, and if you are the administrator, please get your shit together!")
    }
    return apiKey
}

async function requestHypixelData<T extends HypixelBaseResponse>(endpoint: string): Promise<T> {
    const request = await fetch(`${API_URI_BASE}${endpoint}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'API-Key': getApiKey()
        }
    })

    if (!request.ok) {
        throw new Error(`HTTP Error. Status: ${request.status}`)
    }

    const responseBody = await request.json() as T

    if (!responseBody.success) {
        throw new Error(`Hypixel API Error: ${responseBody.cause}`)
    }

    return responseBody
}

export async function getBazaarPriceDataAvg(itemId: string): Promise<Map<string, number>> {
    const bazaarData = await requestHypixelData<HypixelBazaarResponse>('skyblock/bazaar')
    const itemData = bazaarData.products[itemId]

    if (!itemData) {
        throw new Error(`Item ID ${itemId} not found in Bazaar.`)
    }

    const quickStatus = itemData.quick_status
    const saleMean = Math.round(quickStatus.sellPrice * 10) / 10
    const buyMean = Math.round(quickStatus.buyPrice * 10) / 10

    return new Map<string, number>([
        ['SaleAverage', saleMean],
        ['BuyAverage', buyMean]
    ])
}

export async function getItemNamesAndIDs(): Promise<HypixelItem[]> {
    const data = await requestHypixelData<HypixelItemsResponse>('skyblock/items')
    const itemsArray = data.items

    if (!Array.isArray(itemsArray)) {
        throw new Error("Invalid response format: 'items' array missing from Hypixel API.")
    }

    // using the interface type is *much much* cleaner, than whatever arraypuke i was doing, and its nicer to fuse.js when i actualy start implementing that.
    return itemsArray.map(item => ({
        id: item.id,
        name: item.name
    }))
}