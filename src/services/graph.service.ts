import { GraphRepository } from "@/repositories/graph.repository";

export class GraphService {
  private repo = new GraphRepository();

async getDashboardStats() {
  const result = await this.repo.run(`
    CALL {
      MATCH (s:Supplier)
      RETURN count(s) AS suppliers
    }

    CALL {
      MATCH (c:Component)
      RETURN count(c) AS components
    }

    CALL {
      MATCH (p:Product)
      RETURN count(p) AS products
    }

    CALL {
      MATCH (c:Country)
      RETURN count(c) AS countries
    }

    RETURN
      suppliers,
      components,
      products,
      countries
  `);

  const record = result.records[0];

  return {
    suppliers: record.get("suppliers").toNumber(),
    components: record.get("components").toNumber(),
    products: record.get("products").toNumber(),
    countries: record.get("countries").toNumber(),
  };
}

async getSuppliers() {
  const result = await this.repo.run(`
    MATCH (s:Supplier)
    RETURN s.id AS id, s.name AS name
    ORDER BY s.name
  `);

  return result.records.map((r) => ({
    id: r.get("id"),
    name: r.get("name"),
  }));
}

async getCountries() {
  const result = await this.repo.run(`
    MATCH (c:Country)
    RETURN c.code AS code, c.name AS name
    ORDER BY c.name
  `);

  return result.records.map((r) => ({
    code: r.get("code"),
    name: r.get("name"),
  }));
}

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