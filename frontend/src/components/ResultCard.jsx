import { useState } from "react";
import RiskMeter from "./RiskMeter";

export default function ResultCard({ data }) {
  const [show, setShow] = useState(false);

  return (
    <div style={{ margin: "30px", padding: "20px", background: "#1e293b" }}>
      <h2>Result</h2>

      <p>Users: {data.graphData.users}</p>
      <p>IPs: {data.graphData.ips}</p>

      <RiskMeter score={data.ai.riskScore} />

      <p>{data.ai.explanation}</p>

      <button onClick={() => setShow(!show)}>
        Why Fraud?
      </button>

      {show && (
        <ul>
          {data.ai.reasons.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      )}
    </div>
  );
}