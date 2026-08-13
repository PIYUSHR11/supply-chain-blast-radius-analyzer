import { getDriver } from "@/lib/cognodb";

export class GraphRepository {
  async run(
    query: string,
    params: Record<string, unknown> = {}
  ) {
    const driver = getDriver();
    const session = driver.session();

    try {
      return await session.run(query, params);
    } finally {
      await session.close();
    }
  }
}