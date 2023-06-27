import { z } from "zod";
import { updateListingSchema } from "~/pages/listing/[id]";
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
  update: protectedProcedure
    .input(updateListingSchema)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.listing.update({
        where: { id: input.id },
        data: {
          img: input.img,
          type: input.type,
          species: input.species,
          sex: input.sex,
          color: input.color,
          location: input.location,
          name: input.name,
          markings: input.markings,
          uniqueAttribute: input.uniqueAttribute,
        },
      });
    }),
});
