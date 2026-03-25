interface ShoppingItemProps {
    quantity: number,
    name: string,
    price: number
}

export default function ShoppingRow({quantity,name,price}: ShoppingItemProps) {
    return (
    // main shopping row layer
    <div className="flex flex-row w-[418px] h-[30px]">
        {/* Inital piece where the quantity lies */}
        <div className="w-[35px] h-[30px] rounded-l-full bg-mocha-base justify-start">
            

        </div>


    </div>
    )
}