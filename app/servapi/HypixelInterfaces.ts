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
