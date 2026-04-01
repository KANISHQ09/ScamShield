import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import SearchBox from "./components/SearchBox";
import ResultCard from "./components/ResultCard";
import GraphView from "./components/GraphView";

function App() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const analyze = async (input) => {
    try {
      setError(null);
      const res = await axios.post("http://localhost:5000/analyze", { input });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze. Please check your backend connection.");
    }
  };

  return (
    <div style={{ background: "var(--bg-deep)", minHeight: "100vh", color: "var(--text-primary)" }}>
      <Navbar />
      
      <main style={{ paddingBottom: "100px" }}>
        <SearchBox onAnalyze={analyze} />

        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ 
                maxWidth: "600px", 
                margin: "20px auto", 
                padding: "16px", 
                background: "rgba(239, 68, 68, 0.1)", 
                color: "#ef4444", 
                borderRadius: "12px",
                border: "1px solid rgba(239, 68, 68, 0.2)",
                textAlign: "center"
              }}
            >
              {error}
            </motion.div>
          )}

          {result && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ResultCard data={result} />
              
              <div style={{ maxWidth: "1000px", margin: "40px auto", padding: "0 20px" }}>
                <h2 style={{ textAlign: "center", marginBottom: "24px" }}>Relationship Graph</h2>
                <div className="glass" style={{ borderRadius: "24px", overflow: "hidden", height: "500px" }}>
                  <GraphView data={result} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer style={{ 
        padding: "40px", 
        textAlign: "center", 
        borderTop: "1px solid var(--border-glass)",
        color: "var(--text-muted)",
        fontSize: "0.9rem"
      }}>
        © 2026 ScamShield++ AI. All rights reserved. Built for safety.
      </footer>
    </div>
  );
}

export default App;