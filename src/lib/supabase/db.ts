import * as dotenv from "dotenv";
import { logger } from "../../app/utils/utils";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import * as schema from "../../../migrations/schema";

dotenv.config({ path: ".env" });

if (!process.env.DATABASE_URL) {
  logger.warn("🔴 Database URL not provided");
}

const client = postgres(process.env.DATABASE_URL as string, { max: 1 });
const db = drizzle(client, { schema });

const migrateDB = async () => {
  try {
    logger.warn("🟠 Migrating client...");
    await migrate(db, { migrationsFolder: "migrations" });
    logger.info("🟢 Successfully migrated client.");
  } catch (err) {
    logger.error("🔴 An error occurred while migrating client: ", err);
  }
};
migrateDB();

export default db;
