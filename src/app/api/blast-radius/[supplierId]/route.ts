import { NextResponse } from "next/server";
import { GraphService } from "@/services/graph.service";

const graphService = new GraphService();

export async function GET(
  request: Request,
  context: {
    params: Promise<{
      supplierId: string;
    }>;
  }
) {
  try {
    const { supplierId } = await context.params;

    const result =
      await graphService.getBlastRadius(supplierId);

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to fetch blast radius",
      },
      {
        status: 500,
      }
    );
  }
}