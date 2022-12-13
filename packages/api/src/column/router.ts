import { z } from 'zod';

import { protectedProcedure } from '../auth';
import { router } from '../trpc';
import { ColumnsService } from './service';

export const columnRouter = router({
  all: protectedProcedure.input(z.number()).query(({ ctx, input }) => {
    const columns = new ColumnsService(ctx);
    return columns.getBoardColumns(input);
  }),

  byId: protectedProcedure.input(z.number()).query(({ ctx, input }) => {
    const column = new ColumnsService(ctx);
    return column.getColumnById(input);
  }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        order: z.number(),
        boardId: z.number(),
      })
    )
    .mutation(({ ctx, input }) => {
      const column = new ColumnsService(ctx);
      return column.createColumn({
        title: input.title,
        order: input.order,
        boardId: input.boardId,
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().optional(),
        order: z.number().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      const column = new ColumnsService(ctx);
      return column.updateColumn(input);
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    const column = new ColumnsService(ctx);
    return column.deleteColumn(input);
  }),
});

export type ColumnRouter = typeof columnRouter;
