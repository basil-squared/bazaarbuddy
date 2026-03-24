"use client";
import formatCoins from "../utils/formatCoins";
import { useState, useEffect, SyntheticEvent } from "react";
import { getAllItems, getBazaarData } from "../actions";
import { createFuseInstance } from "../constants/search";
import Fuse, { FuseResult } from "fuse.js";
// debounce so the user doesnt nuke the api with indecisive searches
function useDebounce(value: any, delay: number) {
  console.log("Debounce function triggered");
  const [debouncedValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(handler); //cleanup on change
  }, [value, delay]);
  return debouncedValue;
}

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [selectedItem,setSelectedItem] = useState("")
  const [fuse, setFuse] = useState<Fuse<HypixelItem>>();
  const [results, setResults] = useState<FuseResult<HypixelItem>[]>();
  const [bazaarPricing, setBazaarPricing] = useState<{
    buy: number;
    sale: number;
  }>();
  const debouncedQuery = useDebounce(query, 500);
  async function handleListClick(id: string, name: string) {
    setSelectedItem(name)
    setQuery(name);
    setBazaarPricing(undefined);
    setResults([]);
    try {
      const data = await getBazaarData(id);
      setBazaarPricing({
        buy: data.buy,
        sale: data.sale,
      });
    } catch (err) {
      setBazaarPricing({ buy: 0, sale: 0 });
    }
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedItem("")
    setQuery(event.target.value);
  };
  useEffect(() => {
    console.log("Debounce triggered");
    if (debouncedQuery == selectedItem) {
        setResults([])
        return
    }
    if (fuse && debouncedQuery !== "") {
      console.log("Fuse Present and debounce not empty. searching")
      setResults(fuse.search(debouncedQuery).slice(0, 10))
    } else {
      console.log("Neither present, abandoning search")
      setResults([])
      return
    }
  }, [fuse, debouncedQuery]);
  useEffect(() => {
    async function effectSetup() {
      const data = await getAllItems();
      console.log("Raw Data from Server:", data);
      const fuse = createFuseInstance(data);
      setFuse(fuse);
    }
    effectSetup();
  }, []);
  console.log(results);
  return (
    <div className = "flex flex-row items-start gap-8">
    <div>
      <div>
        <input
          value={query}
          className="w-[265px] h-[35px] rounded-[19px] bg-[#1f1f24] text-center"
          onChange={handleChange}
        ></input>
      </div>

      <div >
        <ul className="ml-2">
          {results?.map((result) => (
            <li
              onClick={() => {
                handleListClick(result.item.id, result.item.name);
              }}
              className="w-[247px] h-[21px] rounded-[19px] bg-[#32354b] text-center mt-2 font-family: var(--font-sans)"
              key={result.item.id}
            >
              {result.item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
    {bazaarPricing && ( 
        <div>
            <p className = "text-yellow-500">
                Buy: {formatCoins(bazaarPricing.buy)}  Coins
            </p>
            <p className = "text-yellow-500">
                Sale: {formatCoins(bazaarPricing.sale)} Coins
            </p>
        </div>
    )}
    </div>
  );
}
