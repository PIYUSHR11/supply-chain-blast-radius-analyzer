import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { GraphRepository } from "@/repositories/graph.repository";
import { closeDriver } from "@/lib/cognodb";

const repo = new GraphRepository();

async function count(label: string) {
  const result = await repo.run(
    `MATCH (n:${label}) RETURN count(n) AS count`
  );

  return result.records[0].get("count").toNumber();
}

async function relationshipCount(type: string) {
  const result = await repo.run(
    `MATCH ()-[r:${type}]->() RETURN count(r) AS count`
  );

  return result.records[0].get("count").toNumber();
}

async function main() {
  console.log("===== NODE COUNTS =====");

  console.log("Countries:", await count("Country"));
  console.log("Suppliers:", await count("Supplier"));
  console.log("Components:", await count("Component"));
  console.log("Products:", await count("Product"));
  console.log("Factories:", await count("Factory"));

  console.log("\n===== RELATIONSHIP COUNTS =====");

  console.log("LOCATED_IN:", await relationshipCount("LOCATED_IN"));
  console.log("SUPPLIES:", await relationshipCount("SUPPLIES"));
  console.log("DEPENDS_ON:", await relationshipCount("DEPENDS_ON"));
  console.log("USED_IN:", await relationshipCount("USED_IN"));
  console.log("ASSEMBLES:", await relationshipCount("ASSEMBLES"));
  console.log(
    "ALTERNATIVE_SUPPLIER:",
    await relationshipCount("ALTERNATIVE_SUPPLIER")
  );
}

main()
  .catch(console.error)
  .finally(async () => {
    await closeDriver();
  });