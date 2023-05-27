import { z } from "zod";
import { updateUserSchema } from "~/pages/user/[id]";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getUserById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input: { id }, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { id },
      });
      return user;
    }),

  updateUser: protectedProcedure
    .input(updateUserSchema)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: {
          phone: input.phone,
          facebook: input.facebook,
          instagram: input.instagram,
        },
      });
    }),
});
