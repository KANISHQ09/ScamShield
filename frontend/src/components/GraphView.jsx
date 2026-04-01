import ForceGraph2D from "react-force-graph-2d";

export default function GraphView({ data }) {
  const nodes = [{ id: "Phone" }];
  const links = [];

  for (let i = 0; i < data.graphData.users; i++) {
    nodes.push({ id: "User " + i });
    links.push({ source: "User " + i, target: "Phone" });
  }

  for (let i = 0; i < data.graphData.ips; i++) {
    nodes.push({ id: "IP " + i });
    links.push({ source: "Phone", target: "IP " + i });
  }

  return (
    <div style={{ height: "400px" }}>
      <ForceGraph2D graphData={{ nodes, links }} />
    </div>
  );
}