export interface MetadataResponse {
  suppliers: {
    id: string;
    name: string;
  }[];

  countries: {
    code: string;
    name: string;
  }[];

  stats: {
    suppliers: number;
    components: number;
    products: number;
    countries: number;
  };
}

export interface SpofItem {
  supplierId: string;
  supplierName: string;
  vulnerableComponents: string[];
}