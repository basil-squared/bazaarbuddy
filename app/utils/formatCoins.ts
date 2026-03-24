function roundToOneDecimal(num: number): number {
  return Math.round(num * 10) / 10;
}

export default function formatCoins(coins: number): string {
    let strCoins: string
    if (coins >= 1000000000) {
        strCoins = roundToOneDecimal(coins / 1000000000).toString() + "B"
    } else if (coins >= 1000000) {
        strCoins = roundToOneDecimal(coins / 1000000).toString() + "M"
    } else if (coins >= 1000) {
        strCoins = roundToOneDecimal(coins / 1000).toString() + "K"
    } else {
        strCoins = coins.toString()
    }
    return strCoins

}