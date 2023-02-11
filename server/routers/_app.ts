import { z } from 'zod';
import { procedure, router } from '../trpc';
import { postRouter } from './post';
import { businessRouter } from './business';
import { tagRouter } from './tags';


export const appRouter = router({

  hello: procedure.input(
    z.object({
      text: z.string(),
    }),
  ).query(({ input }) => {
    return {
      greeting: `hello ${input.text}`,
    };
  }),

  post: postRouter,
  business: businessRouter,
  tags: tagRouter

});

// export type definition of API
export type AppRouter = typeof appRouter;