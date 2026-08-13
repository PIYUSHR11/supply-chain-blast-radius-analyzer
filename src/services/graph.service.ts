import { GraphRepository } from "@/repositories/graph.repository";

export class GraphService {
  private repo = new GraphRepository();

async getCountryRisk(countryCode: string) {
  const result = await this.repo.run(
    `
    MATCH (country:Country {code: $countryCode})
          <-[:LOCATED_IN]-
          (supplier:Supplier)

    MATCH (supplier)-[:SUPPLIES]->(component:Component)

    OPTIONAL MATCH (productComponent:Component)
          -[:DEPENDS_ON*0..]->
          (component)

    OPTIONAL MATCH (productComponent)-[:USED_IN]->(product:Product)

    RETURN
      country.name AS country,
      collect(DISTINCT supplier.name) AS suppliers,
      collect(DISTINCT component.name) AS components,
      collect(DISTINCT product.name) AS products
    `,
    { countryCode }
  );

  return result.records.map((record) => ({
    country: record.get("country"),
    suppliers: record.get("suppliers"),
    components: record.get("components"),
    products: record.get("products"),
  }));
}

async getSinglePointsOfFailure() {
  const result = await this.repo.run(`
    MATCH (s:Supplier)-[:SUPPLIES]->(c:Component)

    WITH c, collect(s) AS suppliers

    WHERE size(suppliers) = 1

    RETURN
      suppliers[0].id AS supplierId,
      suppliers[0].name AS supplierName,
      collect(c.name) AS vulnerableComponents
  `);

  return result.records.map((record) => ({
    supplierId: record.get("supplierId"),
    supplierName: record.get("supplierName"),
    vulnerableComponents: record.get("vulnerableComponents"),
  }));
}
 
 async getBlastRadius(supplierId: string) {
    const result = await this.repo.run(
      `
      MATCH (s:Supplier {id: $supplierId})
            -[:SUPPLIES]->
            (root:Component)

      MATCH (productComponent:Component)
            -[:DEPENDS_ON*0..]->
            (root)

      MATCH (productComponent)-[:USED_IN]->(p:Product)

      RETURN
          s.id AS supplierId,
          s.name AS supplierName,
          collect(DISTINCT p.name) AS affectedProducts
      `,
      { supplierId }
    );

    return result.records.map((record) => ({
      supplierId: record.get("supplierId"),
      supplierName: record.get("supplierName"),
      affectedProducts: record.get("affectedProducts"),
    }));
  }
}