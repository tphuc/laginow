import { z } from 'zod';
import { procedure, router } from '../trpc';
import { reviewRouter } from './review';
import { businessRouter } from './business';
import { tagRouter } from './tags';
import { productRouter } from './product';


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

  review: reviewRouter,
  business: businessRouter,
  product: productRouter,
  tags: tagRouter

});

// export type definition of API
export type AppRouter = typeof appRouter;