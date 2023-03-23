/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { observable } from '@trpc/server/observable';
import { EventEmitter } from 'events';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { protectedProcedure, procedure, router } from '@/server/trpc';
import { Post, User } from '@prisma/client';
import slugify from 'slugify';





export const productRouter = router({
    
    add: protectedProcedure
    .input(
        z.object({
            businessId: z.string().optional(),
            slug: z.string().optional(),
            name: z.string(),
            description: z.string().optional(),
            minPrice: z.number().optional(),
            maxPrice: z.number().optional(),
            images: z.array(
                z.object({
                    fileId: z.string(),
                    name: z.string(),
                    url: z.string(),
                    thumbnailUrl: z.string(),
                    width: z.number(),
                    height: z.number(),
                    size: z.number()
                })
            ).optional(),
        })
    )
    .mutation(async ({ input, ctx }) => {
        const user = ctx.session?.user as User

        const { slug } = input;

        console.log(input)

        let business = await prisma.bussiness.findUnique({
            where: {
                slug: slug
            }
        })
        
        let record = await prisma.product.create({
            data: {
                ...input,
                slug: slugify(input.name, {lower: true}),
                businessId: business?.id as string
            }
        })
        
        return record
    }),



});