import { getDriver } from "./cognodb";

export async function verifyConnection() {
  const driver = getDriver();

  const session = driver.session();

  try {
    const result = await session.run(
      "RETURN 'Connected to CognoDB' AS message"
    );

    return result.records[0].get("message");
  } finally {
    await session.close();
  }
}