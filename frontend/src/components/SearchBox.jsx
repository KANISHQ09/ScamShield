import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function SearchBox({ onAnalyze }) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    await onAnalyze(input);
    setIsLoading(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      style={{ 
        maxWidth: "800px", 
        margin: "80px auto 40px", 
        textAlign: "center",
        padding: "0 20px"
      }}
    >
      <h1 style={{ marginBottom: "16px" }}>Protect Your Digital Identity.</h1>
      <p style={{ 
        fontSize: "1.25rem", 
        marginBottom: "40px",
        color: "var(--text-secondary)",
        maxWidth: "600px",
        marginInline: "auto"
      }}>
        Verify phone numbers, IPs, and transactions in real-time with AI-powered fraud detection.
      </p>

      <div style={{ 
        display: "flex", 
        gap: "12px", 
        background: "var(--bg-surface)",
        padding: "8px",
        borderRadius: "16px",
        border: "1px solid var(--border-glass)",
        boxShadow: "var(--shadow-lg)",
        maxWidth: "600px",
        margin: "0 auto"
      }}>
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          flex: 1, 
          padding: "0 16px", 
          color: "var(--text-muted)" 
        }}>
          <Search size={20} />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
            placeholder="Enter phone, IP, or ID (e.g. 9999999999)"
            style={{ 
              background: "transparent",
              border: "none",
              color: "var(--text-primary)",
              padding: "12px",
              width: "100%",
              outline: "none",
              fontSize: "1rem"
            }}
          />
        </div>

        <button 
          onClick={handleAnalyze} 
          disabled={isLoading}
          className="btn-primary"
          style={{ minWidth: "140px" }}
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "Scan Now"}
        </button>
      </div>
    </motion.div>
  );
}