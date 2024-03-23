import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
import { logger } from "./utils/utils";
dotenv.config({ path: ".env" });

if (!process.env.DATABASE_URL) {
  logger.info("🔴 Cannot find database url");
}

export default {
  schema: "./src/lib/supabase/schema.ts",
  out: "./migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || "",
  },
} as Config;
