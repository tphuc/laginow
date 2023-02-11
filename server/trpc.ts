import { initTRPC, TRPCError } from '@trpc/server';
import { Context } from './context';

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.

const t = initTRPC.context<Context>().create();
// Base router and procedure helpers
export const router = t.router;
export const procedure = t.procedure;



const isAuthed = t.middleware(({ next, ctx }) => {
    if (!ctx.session?.user?.email) {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
        });
    }
    return next({
        ctx: {
            // Infers the `session` as non-nullable
            session: ctx.session,
        },
    });
});


export const protectedProcedure = t.procedure.use(isAuthed);