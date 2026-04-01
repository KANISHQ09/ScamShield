import { Shield } from "lucide-react";
import { motion as m } from "framer-motion";

export default function Navbar() {
  return (
    <m.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="glass"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        padding: "16px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Shield size={32} color="#3b82f6" />
        <span style={{ 
          fontSize: "24px", 
          fontWeight: "800", 
          background: "var(--accent-gradient)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
          ScamShield++
        </span>
      </div>
      
      <div style={{ display: "flex", gap: "24px", color: "var(--text-secondary)", fontWeight: "500" }}>
        <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Dashboard</a>
        <a href="#" style={{ color: "inherit", textDecoration: "none" }}>History</a>
        <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Settings</a>
      </div>
    </m.nav>
  );
}