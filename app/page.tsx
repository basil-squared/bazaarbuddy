import TestButton from "./ui/clientTestButton";

import SearchBox from "./ui/searchbox";
import ShoppingRow from "./ui/shoppingRow";

export default function Home() {
  return (
    <div className="w-xl h-auto">
    <ShoppingRow quantity={3} name="Enchanted Oak Log" price={456} shouldCraft={true}></ShoppingRow>
    </div>
  )
}
// To whoever is reading this, I hope you love the things I make.
// I only want to make people happy, people like me.
// If I've made you happy with what I've made,
// Please send me kind words <3