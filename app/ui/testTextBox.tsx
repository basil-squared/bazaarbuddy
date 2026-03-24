"use client";
import { useState } from "react";

export default function TestBox() {
  const [text, setText] = useState("Hello, World!");
  return (
    <div>
      <p className="font-bold text-sky-500">{text}</p>
      <input value={text} onChange={(evt) => setText(evt.target.value)} />
    </div>
  );
}
