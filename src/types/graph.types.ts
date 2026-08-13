export interfact Country {
 code: string;
 name: string;
}

export interface Supplier {
 id: string;
 name: string;
 tier: number;
 riskLevel: "Low" | "Medium" | "High";
}

export interface Component {
 id: string;
 name: string;
 category: string;
 criticality: number;	 
}

export interface Product {
 id: string;
 name: string;
 category: string;
}

export interface Factory {
 id: string;
 name: string;
 city: string;
}