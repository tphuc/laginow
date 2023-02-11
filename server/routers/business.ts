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


export const businessRouter = router({
    add: protectedProcedure
        .input(
            z.object({
                id: z.string().cuid().optional(),
                title: z.string(),
                slug: z.string(),
                address: z.string().optional(),
                phone: z.string().optional(),
                website: z.string().optional(),
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
                tags: z.array(z.object({
                    id: z.string()
                }))
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const user = ctx.session.user as User;
            let { tags, ...data } = input
            const post = await prisma.bussiness.create({
                data: {
                    ownerId: user.id,
                    ...data,
                    tags: {
                        connect: tags
                    }
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
                    address: z.string().optional(),
                    phone: z.string().optional(),
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


    getBySlug: procedure
        .input(
            z.object({
                slug: z.string()
            }),
        )
        .query(async ({ input }) => {
            const slug = input.slug
            let record = await prisma.bussiness.findUnique({
                where: {
                    slug
                }
            })
            return record
        }),

    getAllByUser: protectedProcedure
        .input(
            z.object({
            }),
        )
        .query(async ({ input, ctx }) => {
            const user = ctx.session.user as User;
            let records = await prisma.bussiness.findMany({
                where: {
                    ownerId: user.id
                }
            })
            return records
        }),

    getAllByUserId: procedure
        .input(
            z.object({
                id: z.string()
            }),
        )
        .query(async ({ input, ctx }) => {
            let records = await prisma.bussiness.findMany({
                where: {
                    ownerId: input.id
                }
            })
            return records
        }),



});