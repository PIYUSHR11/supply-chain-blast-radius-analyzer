import neo4j, { Driver } from "neo4j-driver";

let driver: Driver | null = null;

export function getDriver(): Driver {
  if (driver) {
    return driver;
  }

  const uri = process.env.COGNODB_URI;
  const username = process.env.COGNODB_USERNAME;
  const password = process.env.COGNODB_PASSWORD;

  if (!uri || !username || !password) {
    throw new Error(
      "Missing CognoDB environment variables. Check .env.local"
    );
  }

  driver = neo4j.driver(
    uri,
    neo4j.auth.basic(username, password)
  );

  return driver;
}

export async function closeDriver() {
  if (driver) {
    await driver.close();
    driver = null;
  }
}