import { NextResponse } from "next/server";
import { GraphService } from "@/services/graph.service";

const service = new GraphService();

export async function GET() {
  try {
    const [suppliers, countries, stats] = await Promise.all([
      service.getSuppliers(),
      service.getCountries(),
      service.getDashboardStats(),
    ]);

    return NextResponse.json({
      suppliers,
      countries,
      stats,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch metadata" },
      { status: 500 }
    );
  }
}