/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { observable } from '@trpc/server/observable';
import { EventEmitter } from 'events';
import prisma from '@/lib/prisma';
import { boolean, number, z } from 'zod';
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
                    },
                    workingHrs: {
                        '1': {
                            isOpen24Hours: false,
                            openingHour: 8,
                            closingHour: 18
                        },
                        '2': {
                            isOpen24Hours: false,
                            openingHour: 8,
                            closingHour: 18
                        },
                        '3': {
                            isOpen24Hours: false,
                            openingHour: 8,
                            closingHour: 18
                        },
                        '4': {
                            isOpen24Hours: false,
                            openingHour: 8,
                            closingHour: 18
                        },
                        '5': {
                            isOpen24Hours: false,
                            openingHour: 8,
                            closingHour: 20
                        },
                        '6': {
                            isOpen24Hours: false,
                            openingHour: 8,
                            closingHour: 18
                        },
                        '0': {
                            isOpen24Hours: false,
                            openingHour: 8,
                            closingHour: 18
                        }
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
                    description: z.string().optional(),
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

            }),
        )
        .mutation(async ({ input, ctx }) => {
            let data = input.data;

            const post = await prisma.bussiness.update({
                where: {
                    id: input.id
                },
                data,
            });
            return post;
        }),

    updateBySlug: protectedProcedure
        .input(
            z.object({
                slug: z.string(),
                data: z.object({
                    title: z.string().optional(),
                    slug: z.string().optional(),
                    content: z.string().optional(),
                    address: z.string().optional(),
                    phone: z.string().optional(),
                    description: z.string().optional(),
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
                    menuImages: z.array(
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
                    workingHrs: z.object(
                        {
                            '1': z.object({
                                isOpen24Hours: z.boolean(),
                                isClose: z.boolean().optional(),
                                openingHour: z.number(),
                                closingHour: z.number()
                            }),
                            '2': z.object({
                                isOpen24Hours: z.boolean(),
                                isClose: z.boolean().optional(),
                                openingHour: z.number(),
                                closingHour: z.number()
                            }),
                            '3': z.object({
                                isOpen24Hours: z.boolean(),
                                isClose: z.boolean().optional(),
                                openingHour: z.number(),
                                closingHour: z.number()
                            }),
                            '4': z.object({
                                isOpen24Hours: z.boolean(),
                                isClose: z.boolean().optional(),
                                openingHour: z.number(),
                                closingHour: z.number()
                            }),
                            '5': z.object({
                                isOpen24Hours: z.boolean(),
                                isClose: z.boolean().optional(),
                                openingHour: z.number(),
                                closingHour: z.number()
                            }),
                            '6': z.object({
                                isOpen24Hours: z.boolean(),
                                isClose: z.boolean().optional(),
                                openingHour: z.number(),
                                closingHour: z.number()
                            }),
                            '0': z.object({
                                isOpen24Hours: z.boolean(),
                                isClose: z.boolean().optional(),
                                openingHour: z.number(),
                                closingHour: z.number()
                            })
                        }
                    ).optional()
                })

            }),
        )
        .mutation(async ({ input, ctx }) => {
            let data = input.data;
            console.log(input.slug)
            const post = await prisma.bussiness.update({
                where: {
                    slug: input.slug
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
                },

            })
            return record
        }),

    getProducts: procedure
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
                },
                include: {
                    Product: true
                }

            })
            console.log(record)
            return record?.Product || []
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

    addReview: protectedProcedure
        .input(
            z.object({
                slug: z.string(),
                rating: z.number(),
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
                ).optional(),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const user = ctx.session?.user as User
            let records = await prisma.review.create({
                data: {
                    userId: user.id,
                    rating: input?.rating,
                    content: input?.content,
                    businessSlug: input.slug,
                    images: input.images,
                    userLikes: [],
                    userDislikes: []
                }
            })
            return records
        }),

    fetchAllReviewsBySlug: procedure
        .input(
            z.object({
                slug: z.string()
            }),
        )
        .query(async ({ input, ctx }) => {
            let records = await prisma.review.findMany({
                where: {
                    businessSlug: input.slug,
                },
                include: {
                    user: true
                }
            })
            return records
        }),

    fetchInfiniteReviews:
        procedure
            .input(z.object({
                slug: z.string(),
                sort: z.any().optional(),
                limit: z.number().min(1).max(100).nullish(),
                cursor: z.string().nullish(), // <-- "cursor" needs to exist, but can be any type
            }))
            .query(async ({ input }) => {
                const limit = input.limit ?? 50;
                const { cursor } = input;
                const items = await prisma.review.findMany({
                    take: limit + 1, // get an extra item at the end which we'll use as next cursor
                    where: {
                        businessSlug: input.slug
                    },
                    cursor: cursor ? { id: cursor } : undefined,
                    orderBy: {
                        createdAt: input.sort?.length ? input.sort as 'asc' | 'desc' : 'desc'
                    },
                    include: {
                        user: true
                    }
                })
                let nextCursor: typeof cursor | undefined = undefined;
                if (items.length > limit) {
                    const nextItem = items.pop()
                    nextCursor = nextItem!.id;
                }
                return {
                    items,
                    nextCursor,
                };
            }),
    getAvgRating:
        procedure.input(
            z.object({
                slug: z.string()
            })
        ).query(async ({ input }) => {

            const ratingCounts = await prisma.review.groupBy({
                by: ['rating'],
                _count: true,
            });

            let res = await prisma.review.aggregate({
                where: { businessSlug: input.slug },
                _avg: { rating: true },
                _count: true,
            });
            return {
                avg: res._avg,
                count: res._count,
                group: ratingCounts
            }
        })




});