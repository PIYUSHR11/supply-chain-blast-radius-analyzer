import { NextResponse } from "next/server";
import { GraphService } from "@/services/graph.service";

const service = new GraphService();

export async function GET() {
  try {
    const [suppliers, countries] = await Promise.all([
      service.getSuppliers(),
      service.getCountries(),
    ]);

    return NextResponse.json({
      suppliers,
      countries,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch metadata" },
      { status: 500 }
    );
  }
}