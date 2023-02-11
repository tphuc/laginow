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





export const postRouter = router({
    add: protectedProcedure
        .input(
            z.object({
                id: z.string().cuid().optional(),
                title: z.string(),
                slug: z.string(),
                content: z.string(),
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
                ).optional()
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const user = ctx.session.user as User;
            const post = await prisma.post.create({
                data: {
                    userId: user.id,
                    ...input,
                },
            });
 
            return post;
        }),

    update: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                data: z.object({
                    title: z.string().optional(),
                    slug: z.string().optional(),
                    content: z.string().optional(),
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
                    )
                })

            }),
        )
        .mutation(async ({ input, ctx }) => {
            let data = input.data;

            const post = await prisma.post.update({
                where: {
                    id: input.id
                },
                data,
            });
            return post;
        }),




    infinite: procedure
        .input(
            z.object({
                cursor: z.string().nullish(),
                take: z.number().min(1).max(50).nullish(),
            }),
        )
        .query(async ({ input }) => {
            const take = input.take ?? 10;
            const cursor = input.cursor;

            const page = await prisma.post.findMany({
                orderBy: {
                    createdAt: 'desc',
                },
                cursor: cursor ? { id: cursor } : undefined,
                take: take + 1,
                skip: 0,
            });
            const items = page.reverse();
        
            let prevCursor: null | typeof cursor = null;
            if (items.length > take) {
                const prev = items.shift();
                prevCursor = prev!.id;
            }

            return {
                items,
                prevCursor,
            };
        }),




});