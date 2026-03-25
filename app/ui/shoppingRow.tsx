'use client'
import {X} from 'lucide-react'
import formatCoins from '../utils/formatCoins'
interface ShoppingItemProps {
    quantity: number,
    name: string,
    price: number,
    shouldCraft: boolean
}

export default function ShoppingRow({quantity,name,price,shouldCraft}: ShoppingItemProps) {
    const defaultNameClass = "font-bold text-[4cqw]"
    let finalNameClass = ""
    if (shouldCraft) {
        finalNameClass = `${defaultNameClass} text-mocha-green`
    } else {
        finalNameClass = `${defaultNameClass} text-mocha-red`
    }

    return (
    // main shopping row layer
    <div className="@container flex flex-row w-full h-8 max-w-md items-center">
        {/* Inital piece where the quantity lies */}
        <div className="@container flex flex-row items-center w-[10cqw] h-full rounded-l-full bg-mocha-base justify-start">
            <X className="w-s mx-1 inline-2 text-mocha-overlay0 stroke-5" / >   
            <p className="text-[40cqw] font-bold text-mocha-green ">{formatCoins(quantity)}</p>
        </div>
        <div className="flex flex-row w-[5cqw] h-0 justify-start border-b-3 border-mocha-overlay0">
            
        </div>
        <div className="flex flex-row items-center w-[40cqw] h-full bg-mocha-base justify-center min-w-0 truncate">
            <p  className={finalNameClass}>{name}</p>
        </div>
        
        <div className = "flex flex-row justify-center items-center border-b-3 flex-grow border-mocha-overlay0"></div>
        <div className="@container flex flex-row items-center w-[30cqw] h-full rounded-r-full bg-mocha-base justify-center">
               
            <p className="text-[15cqw] font-bold text-mocha-yellow ">{`${formatCoins(price)} Coins`}</p>
        </div>


    </div>
    )
}