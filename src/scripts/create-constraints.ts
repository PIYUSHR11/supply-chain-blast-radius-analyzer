import dotenv from "dotenv";
import { GraphRepository } from "@/repositories/graph.repository";
import { closeDriver } from "@/lib/cognodb";

dotenv.config({ path: ".env.local" });

const repo = new GraphRepository();

async function main() {
  const constraints = [
    `
    CREATE CONSTRAINT country_code_unique IF NOT EXISTS
    FOR (c:Country)
    REQUIRE c.code IS UNIQUE
    `,
    `
    CREATE CONSTRAINT supplier_id_unique IF NOT EXISTS
    FOR (s:Supplier)
    REQUIRE s.id IS UNIQUE
    `,
    `
    CREATE CONSTRAINT component_id_unique IF NOT EXISTS
    FOR (c:Component)
    REQUIRE c.id IS UNIQUE
    `,
    `
    CREATE CONSTRAINT product_id_unique IF NOT EXISTS
    FOR (p:Product)
    REQUIRE p.id IS UNIQUE
    `,
    `
    CREATE CONSTRAINT factory_id_unique IF NOT EXISTS
    FOR (f:Factory)
    REQUIRE f.id IS UNIQUE
    `,
  ];

  for (const query of constraints) {
    await repo.run(query);
  }

  console.log("Constraints created");
}

main().catch(console.error)
          .finally(async () => {
         await closeDriver(); 
        });