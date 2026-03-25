"use server";

import { getBazaarPriceDataAvg } from "./servapi/HypixelAPI";
import { initializeRedis } from "./serverHelpers/redisHelper";
import recipeData from "./resources/recipes.json"
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

const priceCache = new Map<string, number>();
export async function CalculateCost(
  itemID: string, 
  requestedQuantity: number, 
  visited = new Set<string>(),

) {
  const recipes = recipeData as RecipeDictionary;

  // prevents circular loops
  if (visited.has(itemID)) {
    const data = await getBazaarData(itemID);
    return { price: data.buy * requestedQuantity, canCraft: false };
  }
  visited.add(itemID);

  // raw material
  if (!recipes[itemID]) {
    if (!priceCache.has(itemID)) {
      const data = await getBazaarData(itemID);
      priceCache.set(itemID, data.buy);
    }
    return { 
      price: (priceCache.get(itemID) || 0) * requestedQuantity, 
      
      canCraft: false 
    };
  }

  
  let craftingCost = 0;
  const recipe = recipes[itemID]!;
  const entries = Object.entries(recipe.recipe);

  
  for (const [slot, ingredient] of entries) {
    if (!ingredient) continue; 

    const [childId, qtyStr] = ingredient.split(":");
    const qty = parseInt(qtyStr);

    
    const result = await CalculateCost(childId, qty, new Set(visited));
    craftingCost += result.price;
  }

  
  const costPerSingleItem = craftingCost / recipe.count;
  
  
  const bazaarData = await getBazaarData(itemID);
  const buyDirectPrice = bazaarData.buy;

  
  const shouldCraft = costPerSingleItem < buyDirectPrice;
  const finalUnitPrice = shouldCraft ? costPerSingleItem : buyDirectPrice;

  return {
    price: finalUnitPrice * requestedQuantity,
    unitPrice: finalUnitPrice,
    shouldCraft,
    canCraft: true
  };
}

export async function CalculateAndItemizeCosts(
  itemId:string,
  requestedQuantity:number,
  visited=new Set<string>(),
  ) {
  const recipes = recipeData as RecipeDictionary

  if (visited.has(itemId)) {
    const data = await getBazaarData(itemId);
    return { price: data.buy * requestedQuantity, itemMap: new Map([[itemId, requestedQuantity]]), canCraft: false };

  }
  const nextVisited = new Set(visited)
  nextVisited.add(itemId)
  // so we arent calculating 
   if (!recipes[itemId]) {
    if (!priceCache.has(itemId)) {
      const data = await getBazaarData(itemId);
      priceCache.set(itemId, data.buy);
      
    }
    
    const itemMap = new Map<string,number>([[
      itemId,requestedQuantity
    ]])
    return { 
      price: (priceCache.get(itemId) || 999999999) * requestedQuantity,
      unitPrice: priceCache.get(itemId),
      itemMap,
      canCraft: false 
    };

  }
  let totalCraftingCost = 0
  const combinedIngredientsMap = new Map()
  for (const recipeItem of Object.values(recipes[itemId].recipe)) {
    if (!recipeItem) continue; 

    const [childId, qtyStr] = recipeItem.split(":");
    const qty = parseInt(qtyStr);

      const result = await CalculateAndItemizeCosts(childId,qty,nextVisited)
      if (!result) {
        console.log('No result from function')
        return
      }
      if (result.price) {
        totalCraftingCost += result.price
      }
      for (const [id,qty] of result.itemMap as Map<string,number>) {
        const current = combinedIngredientsMap.get(id) ?? 0 
        combinedIngredientsMap.set(id,qty+current)
      }

  }
  const singleUnitCost = totalCraftingCost / recipes[itemId].count
  const bazaarData = await getBazaarData(itemId)
  const buyPrice = (bazaarData.buy || 999999999)
  let finalUnitPrice = 0
  let numberOfCrafts = 0
  // bazaar is cheaper
  if (buyPrice < singleUnitCost) {
    finalUnitPrice = buyPrice
    combinedIngredientsMap.clear()
    combinedIngredientsMap.set(itemId,requestedQuantity)

  }
  // crafting is cheaper 
  else {
    finalUnitPrice = singleUnitCost
     // scale
    numberOfCrafts = Math.ceil(requestedQuantity / recipes[itemId].count)
    combinedIngredientsMap.forEach((v:number,k:string) => {
    combinedIngredientsMap.set(k,v*numberOfCrafts)

    })

    
  }
 
  
  
  return {
    itemMap: combinedIngredientsMap,
    unitPrice: finalUnitPrice,
    price: finalUnitPrice * requestedQuantity,
    canCraft:true

  }
  

}