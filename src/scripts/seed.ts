import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import countries from "@/data/countries.json";
import suppliers from "@/data/suppliers.json";
import components from "@/data/components.json";
import products from "@/data/products.json";
import factories from "@/data/factories.json";
import relationships from "@/data/relationships.json";

import { GraphRepository } from "@/repositories/graph.repository";
import { closeDriver } from "@/lib/cognodb";

const repo =  new GraphRepository();

async function seedCountries() {
 console.log("Seeding countries... ");
 for(const country of countries){
await repo.run(
 `
 MERGE (c:Country {code: $code})
 SET
       c.name = $name
 `,
  country
 ); 
 }
}

async function seedSuppliers() {
 console.log("Seeding supplier... ");
 for(const supplier of suppliers){
 await repo.run(
 `
 MERGE (s: Supplier {id: $id})
 SET 
          s.name = $name,
          s.tier  = $tier,
          s.riskLevel = $riskLevel
 `,
   supplier	
   );
  }
}

async function seedComponents() {
console.log("Seeding components... ");
for(const component of components) {
await repo.run(
`
 MERGE(c :Component {id: $id})
 SET 
          c.name = $name,
          c.category = $category,
          c.criticality = $criticality
`,
component
 );
 }
}

async function seedProducts() {
console.log("Seeding Products... ");
for(const product of products) {
await repo.run(
`
 MERGE(p: Product {id: $id})
 SET 
         p.name = $name,
         p.category = $category
`,product
);
}
}

async function seedFactories() {
console.log("Seeding Factory... ");
for(const factory of factories){
await  repo.run(
`
MERGE (f: Factory {id: $id})
SET 
        f.name = $name,
        f.city = $city
`, factory
);
}
}

async function seedRelationships() {
 console.log("Seeding Relationships... ");
 //Supplier -> Country 

for(const rel of relationships.supplierCountry){
 await repo.run(
`
 MATCH (s: Supplier {id: $supplierId})
 MATCH (c: Country {code: $countryCode})
 MERGE (s)-[:LOCATED_IN]->(c)
`,rel
  );
 }


//Factory -> Country

for(const rel of relationships.factoryCountry){
await repo.run(
`
MATCH (f: Factory {id: $factoryId})
MATCH (c: Country {code: $countryCode})
MERGE (f)-[:LOCATED_IN]->(c)
`,rel
 );
}

// Supplier -> Component

  for (const rel of relationships.supplies) {
    await repo.run(
      `
      MATCH (s:Supplier {id: $supplierId})
      MATCH (c:Component {id: $componentId})

      MERGE (s)-[:SUPPLIES]->(c)
      `,
      rel
    );
  }

  // Component -> Component

  for (const rel of relationships.dependsOn) {
    await repo.run(
      `
      MATCH (source:Component {id: $componentId})
      MATCH (target:Component {id: $dependsOnId})

      MERGE (source)-[:DEPENDS_ON]->(target)
      `,
      rel
    );
  }

  // Component -> Product

  for (const rel of relationships.usedIn) {
    await repo.run(
      `
      MATCH (c:Component {id: $componentId})
      MATCH (p:Product {id: $productId})

      MERGE (c)-[:USED_IN]->(p)
      `,
      rel
    );
  }

  // Factory -> Product

  for (const rel of relationships.assembles) {
    await repo.run(
      `
      MATCH (f:Factory {id: $factoryId})
      MATCH (p:Product {id: $productId})

      MERGE (f)-[:ASSEMBLES]->(p)
      `,
      rel
    );
  }

  // Supplier -> Supplier

  for (const rel of relationships.alternativeSuppliers) {
    await repo.run(
      `
      MATCH (s1:Supplier {id: $primarySupplierId})
      MATCH (s2:Supplier {id: $alternativeSupplierId})

      MERGE (s1)-[:ALTERNATIVE_SUPPLIER]->(s2)
      `,
      rel
    );
  }
}

async function main() {
 await seedCountries();
 await seedSuppliers();
 await seedComponents();
 await seedProducts();
 await seedFactories();
 await seedRelationships();
 console.log("Seed complete");
}

main()
        .catch(console.error)
        .finally(async () => {
        await closeDriver();
      });