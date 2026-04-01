import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle, Info, Users, Globe } from "lucide-react";
import RiskMeter from "./RiskMeter";

export default function ResultCard({ data }) {
  const isHighRisk = data.ai.riskScore > 70;
  
  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="glass glass-card"
        style={{ 
          maxWidth: "800px", 
          margin: "40px auto", 
          textAlign: "left"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "32px", alignItems: "flex-start" }}>
          <div>
            <h2 style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
              Analysis Report
              {isHighRisk ? (
                <span style={{ fontSize: "0.75rem", background: "rgba(239, 68, 68, 0.2)", color: "#ef4444", padding: "4px 8px", borderRadius: "99px", fontWeight: "600" }}>HIGH RISK</span>
              ) : (
                <span style={{ fontSize: "0.75rem", background: "rgba(16, 185, 129, 0.2)", color: "#10b981", padding: "4px 8px", borderRadius: "99px", fontWeight: "600" }}>SECURE</span>
              )}
            </h2>
            <p style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Users size={16} /> Users: {data.graphData.users}</span>
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Globe size={16} /> IPs: {data.graphData.ips}</span>
            </p>
          </div>
          <RiskMeter score={data.ai.riskScore} />
        </div>

        <div style={{ 
          background: "rgba(255, 255, 255, 0.05)", 
          padding: "24px", 
          borderRadius: "16px",
          marginBottom: "24px",
          border: "1px solid var(--border-glass)"
        }}>
          <h3 style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px", color: "var(--text-primary)" }}>
            <Info size={18} color="#3b82f6" />
            AI Explanation
          </h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: "1.6" }}>
            {data.ai.explanation}
          </p>
        </div>

        <div>
          <h3 style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px", color: "var(--text-primary)" }}>
            <AlertCircle size={18} color="#ef4444" />
            Fraud Risk Reasons
          </h3>
          <ul style={{ listStyle: "none", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {data.ai.reasons.map((r, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
                style={{ 
                  background: "rgba(239, 68, 68, 0.05)", 
                  padding: "12px 16px", 
                  borderRadius: "12px",
                  color: "#ef4444",
                  fontSize: "0.9rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  border: "1px solid rgba(239, 68, 68, 0.1)"
                }}
              >
                <div style={{ width: "6px", height: "6px", background: "#ef4444", borderRadius: "50%" }} />
                {r}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}