import { authRouter } from './auth/router';
import { boardRouter } from './board/board.router';
import { columnRouter } from './column/column.router';
import { postRouter } from './post/router';
import { taskRouter } from './task/task.router';
import { router } from './trpc';

export const appRouter = router({
  post: postRouter,
  auth: authRouter,
  board: boardRouter,
  column: columnRouter,
  task: taskRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
