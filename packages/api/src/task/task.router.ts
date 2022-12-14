import { z } from 'zod';

import { protectedProcedure } from '../auth';
import { router } from '../trpc';
import { TaskService } from './task.service';

export const taskRouter = router({
  all: protectedProcedure.input(z.number()).query(({ ctx, input }) => {
    const tasks = new TaskService(ctx);
    return tasks.getColumnTasks(input);
  }),

  byId: protectedProcedure.input(z.number()).query(({ ctx, input }) => {
    const task = new TaskService(ctx);
    return task.getTaskById(input);
  }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        order: z.number(),
        columnId: z.number(),
        description: z.string().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      const task = new TaskService(ctx);
      return task.createTask({
        title: input.title,
        order: input.order,
        columnId: input.columnId,
        description: input.description,
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        newData: z.object({
          title: z.string().optional(),
          order: z.number().optional(),
          description: z.string().optional(),
        }),
      })
    )
    .mutation(({ ctx, input }) => {
      const task = new TaskService(ctx);
      return task.updateTask(input.id, input.newData);
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    const task = new TaskService(ctx);
    return task.deleteTask(input);
  }),
});

export type TaskRouter = typeof taskRouter;
