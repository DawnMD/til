// drizzle.config.ts
import type { Config } from "drizzle-kit";
import "dotenv/config";

export default {
  dbCredentials: {
    connectionString: process.env.DB_URL!,
  },
  schema: ["./src/db/schema.ts"],
  out: "./src/db/migrations",
  breakpoints: true,
  driver: "mysql2",
} satisfies Config;
