export default function RiskMeter({ score }) {
  let color = "green";
  if (score > 70) color = "red";
  else if (score > 40) color = "orange";

  return (
    <div>
      <p>Risk Score: {score}</p>
      <div style={{ background: "#333", height: "10px" }}>
        <div style={{
          width: `${score}%`,
          height: "100%",
          background: color
        }} />
      </div>
    </div>
  );
}