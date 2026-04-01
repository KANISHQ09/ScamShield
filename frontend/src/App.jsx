import { useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import SearchBox from "./components/SearchBox";
import ResultCard from "./components/ResultCard";
import GraphView from "./components/GraphView";

function App() {
  const [result, setResult] = useState(null);

  const analyze = async (input) => {
    const res = await axios.post("http://localhost:5000/analyze", { input });
    setResult(res.data);
  };

  return (
    <div style={{ background: "#0f172a", minHeight: "100vh", color: "white" }}>
      <Navbar />
      <SearchBox onAnalyze={analyze} />

      {result && (
        <>
          <ResultCard data={result} />
          <GraphView data={result} />
        </>
      )}
    </div>
  );
}

export default App;