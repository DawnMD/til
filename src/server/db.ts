import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { env } from "~/env.mjs";

// create the connection
const connection = connect({
  url: env.DB_URL,
});

export const db = drizzle(connection, {
  logger: env.NODE_ENV === "development" ? true : false,
});
