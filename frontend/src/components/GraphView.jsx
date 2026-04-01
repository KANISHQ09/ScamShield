import ForceGraph2D from "react-force-graph-2d";

export default function GraphView({ data }) {
  // Define colors based on node types
  const COLORS = {
    phone: "#3b82f6", // Electric Blue
    user: "#10b981",  // Emerald Green
    ip: "#f43f5e"     // Rose Red
  };

  const nodes = [{ id: "Target", label: "Phone", type: "phone", color: COLORS.phone }];
  const links = [];

  for (let i = 0; i < data.graphData.users; i++) {
    const userId = "User " + (i + 1);
    nodes.push({ id: userId, label: userId, type: "user", color: COLORS.user });
    links.push({ source: userId, target: "Target" });
  }

  for (let i = 0; i < data.graphData.ips; i++) {
    const ipId = "IP " + (i + 1);
    nodes.push({ id: ipId, label: ipId, type: "ip", color: COLORS.ip });
    links.push({ source: "Target", target: ipId });
  }

  return (
    <div style={{ height: "500px", width: "100%", position: "relative" }}>
      <ForceGraph2D
        graphData={{ nodes, links }}
        nodeLabel="label"
        nodeColor={n => n.color}
        nodeRelSize={6}
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.label;
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Inter, sans-serif`;
          const textWidth = ctx.measureText(label).width;
          const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

          // Draw node circle
          ctx.beginPath();
          ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false);
          ctx.fillStyle = node.color;
          ctx.fill();
          
          // Add white glow for better visibility
          ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
          ctx.lineWidth = 1 / globalScale;
          ctx.stroke();

          // Draw label below node
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
          ctx.fillText(label, node.x, node.y + 10);
        }}
      />
    </div>
  );
}