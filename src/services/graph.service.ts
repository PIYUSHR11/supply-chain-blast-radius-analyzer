import { GraphRepository } from "@/repositories/graph.repository";

export class GraphService {
  private repo = new GraphRepository();

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