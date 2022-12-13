import { authRouter } from './auth/router';
import { boardRouter } from './board/router';
import { postRouter } from './post/router';
import { router } from './trpc';

export const appRouter = router({
  post: postRouter,
  auth: authRouter,
  board: boardRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
