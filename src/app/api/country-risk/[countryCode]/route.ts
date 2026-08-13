import { NextResponse } from "next/server";
import { GraphService } from "@/services/graph.service";

const graphService = new GraphService();

export async function GET(
  request: Request,
  context: {
    params: Promise<{
      countryCode: string;
    }>;
  }
) {
  try {
    const { countryCode } = await context.params;

    const result =
      await graphService.getCountryRisk(countryCode);

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to fetch country risk",
      },
      {
        status: 500,
      }
    );
  }
}