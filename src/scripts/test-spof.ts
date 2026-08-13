import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { GraphService } from "@/services/graph.service";
import { closeDriver } from "@/lib/cognodb";

const service = new GraphService();

async function main() {
  const result = await service.getSinglePointsOfFailure();

  console.log(JSON.stringify(result, null, 2));
}

main()
  .catch(console.error)
  .finally(async () => {
    await closeDriver();
  });