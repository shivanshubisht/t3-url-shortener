import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const urlRouter = createTRPCRouter({
  shorten: publicProcedure
    .input(
      z.object({
        link: z.string().url(),
        customName: z.optional(z.nullable(z.string())),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { link, customName } = input;
      const existingCustomLink = await ctx.prisma.link.findFirst({
        where: { customname: customName },
      });
      if (existingCustomLink && existingCustomLink.url !== link) {
        return {
          error: `Custom name already exists for another URL ${existingCustomLink.url}. Either change your custom name or change the custom name for the existing custom URL.`,
        };
      }

      const existingLink = await ctx.prisma.link.findFirst({
        where: { url: link },
      });

      if (existingLink) {
        const existingCustomName = await ctx.prisma.link.findFirst({
          where: { customname: customName },
        });
        if (existingCustomName) {
          return {
            customName: existingLink.customname,
          };
        }

        if (customName) {
          const updatedLink = await ctx.prisma.link.update({
            where: { id: existingLink.id },
            data: { customname: customName },
          });
          return {
            customName: updatedLink.customname,
          };
        }

        return {
          link: existingLink.linkId,
        };
      }

      const id = Math.random().toString(36).substring(2, 8);
      const newLink = await ctx.prisma.link.create({
        data: {
          url: link,
          linkId: id,
          customname: customName,
        },
      });
      return newLink.customname
        ? { customName: newLink.customname }
        : { link: newLink.linkId };
    }),
});
