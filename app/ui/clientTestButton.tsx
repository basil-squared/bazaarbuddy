'use client'
import { useState } from 'react'
import { getBazaarData } from '../actions' // Import the action, not the API class

export default function TestButton() {
    const [prices, setPrices] = useState<{ buy: number, sale: number } | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleClick() {
        setLoading(true);
        try {
            const data = await getBazaarData('RAW_CHICKEN');
            setPrices(data);
        } catch (e) {
            console.error("Fetch failed", e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="p-4 border rounded">
            <button
                onClick={handleClick}
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                {loading ? 'Fetching...' : 'Check Chicken Price'}
            </button>

            {prices && (
                <div className="mt-2">
                    <p>Instant Buy: <strong>{prices.buy}</strong></p>
                    <p>Instant Sell: <strong>{prices.sale}</strong></p>
                </div>
            )}
        </div>
    );
}