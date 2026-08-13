import { NextResponse } from "next/server";
import { GraphService } from "@/services/graph.service";

const graphService = new GraphService();

export async function GET() {
  try {
    const result =
      await graphService.getSinglePointsOfFailure();

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to fetch SPOF data",
      },
      {
        status: 500,
      }
    );
  }
}