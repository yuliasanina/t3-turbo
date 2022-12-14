import { z } from 'zod';

import { protectedProcedure } from '../auth';
import { router } from '../trpc';
import { BoardsService } from './board.service';

export const boardRouter = router({
  all: protectedProcedure.input(z.string().cuid()).query(({ ctx, input }) => {
    const boards = new BoardsService(ctx);
    return boards.getUserBoards(input);
  }),

  byId: protectedProcedure.input(z.number()).query(({ ctx, input }) => {
    const board = new BoardsService(ctx);
    return board.getBoardById(input);
  }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        order: z.number(),
        userId: z.string().uuid(),
      })
    )
    .mutation(({ ctx, input }) => {
      const board = new BoardsService(ctx);
      return board.createBoard({
        title: input.title,
        order: input.order,
        userId: input.userId,
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        newData: z.object({
          title: z.string().optional(),
          order: z.number().optional(),
        }),
      })
    )
    .mutation(({ ctx, input }) => {
      const board = new BoardsService(ctx);
      return board.updateBoard(input.id, input.newData);
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    const board = new BoardsService(ctx);
    return board.deleteBoard(input);
  }),
});

export type BoardRouter = typeof boardRouter;
