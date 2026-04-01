import express from "express";
import driver from "../neo4j.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { input } = req.body;

  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (p:Phone {number: $input})<-[:USES]-(u:User)
      OPTIONAL MATCH (u)-[:CONNECTED_TO]->(ip:IP)
      RETURN count(DISTINCT u) as users, count(DISTINCT ip) as ips
      `,
      { input }
    );

    const record = result.records[0];

    const data = {
      users: record.get("users").toInt(),
      ips: record.get("ips").toInt()
    };

    // 🔥 Smart AI Logic
    const riskScore = Math.min(100, data.users * 30 + data.ips * 20);

    let explanation = "";
    let reasons = [];

    if (data.users > 1) {
      reasons.push("Multiple users linked to same phone");
    }
    if (data.ips > 0) {
      reasons.push("IP associated with suspicious activity");
    }

    if (riskScore > 70) {
      explanation = "🚨 High fraud risk detected.";
    } else if (riskScore > 40) {
      explanation = "⚠️ Moderate risk detected.";
    } else {
      explanation = "✅ Low risk.";
    }

    res.json({
      graphData: data,
      ai: {
        riskScore,
        explanation,
        reasons
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  } finally {
    await session.close();
  }
});

export default router;