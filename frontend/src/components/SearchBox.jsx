import { useState } from "react";

export default function SearchBox({ onAnalyze }) {
  const [input, setInput] = useState("");

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter phone (try: 9999999999)"
        style={{ padding: "10px", width: "250px" }}
      />

      <button onClick={() => onAnalyze(input)}>
        Analyze
      </button>
    </div>
  );
}