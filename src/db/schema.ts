import type { InferModel } from "drizzle-orm";
import {
  mysqlTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const til = mysqlTable("til", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 191 }).notNull(),
  created_at: timestamp("created_at").notNull().defaultNow().onUpdateNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  tags: text("tags").notNull(),
});

export type NewTilType = InferModel<typeof til, "insert">;
export type TilType = InferModel<typeof til, "select">;
