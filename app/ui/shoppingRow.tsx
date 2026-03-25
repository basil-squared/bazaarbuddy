'use client'
import {X} from 'lucide-react'

interface ShoppingItemProps {
    quantity: number,
    name: string,
    price: number,
    shouldCraft: boolean
}

export default function ShoppingRow({quantity,name,price,shouldCraft}: ShoppingItemProps) {
    return (
    // main shopping row layer
    <div className="flex flex-row w-[418px] h-[30px]">
        {/* Inital piece where the quantity lies */}
        <div className="flex flex-row items-center w-[40px] h-[30px] rounded-l-full bg-mocha-base justify-start">
            <X className="w-s mx-1 inline-2 text-mocha-overlay0 stroke-5" / >   
            <p className="font-bold text-mocha-green">{quantity}</p>
        </div>
        <div className="flex flex-row w-5px h-0 justify-start">
            <p className="font-bold text-mocha-overlay0">—</p>
        </div>
        <div className="flex flex-row items-center w-[184px] h-[30px] bg-mocha-base justify-center">
            <p className="font-bold">{name}</p>
        </div>


    </div>
    )
}