interface HypixelBaseResponse {
  success: boolean;
  cause?: string; // only really on errors.
}
interface HypixelBazaarResponse extends HypixelBaseResponse {
  products: {
    [itemId: string]: {
      quick_status: {
        sellPrice: number;
        buyPrice: number;
      };
    };
  };
}
interface HypixelItem {
  id: string;
  name: string;
}
interface HypixelItemsResponse extends HypixelBaseResponse {
  items: Array<HypixelItem>;
}
interface RedisBazaarHash {
  [itemId: string]: string;
}


type IngredientString = string;

interface RecipeGrid {
  A1?: IngredientString; A2?: IngredientString; A3?: IngredientString;
  B1?: IngredientString; B2?: IngredientString; B3?: IngredientString;
  C1?: IngredientString; C2?: IngredientString; C3?: IngredientString;
}

interface RecipeItem {
  name: string;
  count: number; 
  recipe: RecipeGrid;
}

interface RecipeDictionary {
  [itemId: string]: RecipeItem | undefined;
}