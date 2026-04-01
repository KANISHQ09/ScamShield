import { motion } from "framer-motion";

export default function RiskMeter({ score }) {
  let color = "#10b981"; // Green
  if (score > 70) color = "#ef4444"; // Red
  else if (score > 40) color = "#f59e0b"; // Orange

  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div style={{ position: "relative", width: "80px", height: "80px" }}>
      <svg width="80" height="80" viewBox="0 0 80 80">
        {/* Background Circle */}
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="transparent"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth="8"
        />
        {/* Progress Circle */}
        <motion.circle
          cx="40"
          cy="40"
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeLinecap="round"
          transform="rotate(-90 40 40)"
        />
      </svg>
      {/* Percentage Text */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center"
      }}>
        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: "600" }}>RISK</div>
        <div style={{ fontSize: "1.2rem", fontWeight: "800", color: color }}>{score}</div>
      </div>
    </div>
  );
}