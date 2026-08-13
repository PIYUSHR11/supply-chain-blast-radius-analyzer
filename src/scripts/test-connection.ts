import { verifyConnection } from "../lib/health-check";
import dotenv from "dotenv";
import { closeDriver } from "../lib/cognodb";

dotenv.config({path: ".env.local"});

async function main() {
  try {
    const result = await verifyConnection();

    console.log("SUCCESS");
    console.log(result);
    process.exit(0);
  } catch (error) {
    console.error("FAILED");
    console.error(error);
    process.exit(1);
  } finally {
    await closeDriver();
  } 
}

main();