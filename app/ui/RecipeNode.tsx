import { ChevronUp } from "lucide-react";

interface RecipeItemProps {
  quantity: number;
  name: string;
  price: string;
}

export function RecipeItem({ quantity, name, price }: RecipeItemProps) {
  return (
    <div className="flex items-center justify-between w-[393px] h-[70px] px-4 rounded-2xl bg-mocha-surface0 border border-mocha-surface1">
      
      <div className="flex flex-col justify-center">
        <span className="text-3xl font-bold text-mocha-green leading-none">
          {quantity}x
        </span>
        <span className="text-sm font-bold text-mocha-subtext1 mt-1">
          {name}
        </span>
      </div>
      
      
      <div className="flex items-center gap-4 h-full">
        
        <div className="h-4/5 w-[1px] bg-mocha-surface1" />
        
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-mocha-yellow tabular-nums">
            {price}
          </span>
          <ChevronUp className="w-5 h-5 text-mocha-text" />
        </div>
      </div>
    </div>
  );
}