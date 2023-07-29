import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { type NewTilType, til } from "~/db/schema";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const tilRouter = createTRPCRouter({
  getAllTils: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.db.select().from(til).execute();
    } catch (error) {
      return new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error getting all tils",
      });
    }
  }),
  createTil: protectedProcedure
    .input(
      z.object({
        title: z.string().nonempty(),
        content: z.string().nonempty(),
        tags: z.string().nonempty(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const data = {
        content: input.content,
        tags: input.tags,
        title: input.title,
        userId: ctx.auth.userId,
      } satisfies NewTilType;

      try {
        await ctx.db.insert(til).values(data);
      } catch (error) {
        return new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error creating til",
        });
      }
    }),
});