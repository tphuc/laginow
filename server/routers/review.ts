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





export const reviewRouter = router({
    
    userLike: protectedProcedure
    .input(
        z.object({
            id: z.string()
        })
    )
    .mutation(async ({ input, ctx }) => {
        const user = ctx.session?.user as User
        let review = await prisma.review.findUnique({
            where: {
                id: input.id
            }
        })

        let _userLikes = review?.userLikes as Array<string>

        let userLikes = _userLikes?.length ? [..._userLikes] : []
        if(userLikes.findIndex(item => item == user.id) == -1){
            userLikes.push(user.id)
        }

        let records = await prisma.review.update({
            where: {
                id: input.id,
            },
            data: {
                userLikes
            }
        })
        return records
    }),

    userDislike: protectedProcedure
    .input(
        z.object({
            id: z.string()
        })
    )
    .mutation(async ({ input, ctx }) => {
        const user = ctx.session?.user as User
        let review = await prisma.review.findUnique({
            where: {
                id: input.id
            }
        })

        let _userDislike = review?.userDislikes as Array<string>

        let userDislikes = _userDislike?.length ? [..._userDislike] : []
        if(userDislikes.findIndex(item => item == user.id) == -1){
            userDislikes.push(user.id)
        }

        let records = await prisma.review.update({
            where: {
                id: input.id,
            },
            data: {
                userDislikes
            }
        })
        return records
    }),


});