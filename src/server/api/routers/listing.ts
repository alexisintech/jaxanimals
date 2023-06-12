import { z } from "zod";
import { createListingSchema } from "~/pages/listing/create";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const listingRouter = createTRPCRouter({
  getListingById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input: { id }, ctx }) => {
      const listing = await ctx.prisma.listing.findUnique({
        where: { id },
      });
      return listing;
    }),
  // updateUser: protectedProcedure
  //   .input(updateUserSchema)
  //   .mutation(({ ctx, input }) => {
  //     return ctx.prisma.user.update({
  //       where: { id: ctx.session.user.id },
  //       data: {
  //         phone: input.phone,
  //         facebook: input.facebook,
  //         instagram: input.instagram,
  //       },
  //     });
  //   }),
  create: protectedProcedure
    .input(createListingSchema)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.listing.create({
        data: {
          img: input.img,
          type: input.type,
          species: input.species,
          sex: input.sex,
          name: input.name,
          color: input.color,
          markings: input.markings,
          uniqueAttribute: input.uniqueAttribute,
          location: input.location,
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
    }),
});
