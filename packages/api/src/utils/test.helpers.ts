import { Context } from '../context';
import { TTestBoard, TTestColumn, TTestTask } from './test.constants';

export const createTestUser = async (ctx: Context, title: string) => {
  return await ctx.prisma.user.create({
    data: { name: title },
  });
};

export const createTestBoard = async ({
  ctx,
  userId,
  board,
}: {
  ctx: Context;
  userId: string;
  board: TTestBoard;
}) => {
  return await ctx.prisma.board.create({
    data: {
      userId: userId,
      title: board.title,
      order: board.order,
    },
  });
};

export const createTestColumn = async ({
  ctx,
  boardId,
  column,
}: {
  ctx: Context;
  boardId: number;
  column: TTestColumn;
}) => {
  return await ctx.prisma.column.create({
    data: {
      boardId: boardId,
      title: column.title,
      order: column.order,
    },
  });
};

export const createTestTask = async ({
  ctx,
  columnId,
  task,
}: {
  ctx: Context;
  columnId: number;
  task: TTestTask;
}) => {
  return await ctx.prisma.task.create({
    data: {
      columnId: columnId,
      title: task.title,
      order: task.order,
    },
  });
};

export const getTestUserId = async (ctx: Context, title: string) => {
  return (
    await ctx.prisma.user.findFirst({
      where: { name: title },
      select: { id: true },
    })
  )?.id;
};

export const getTestBoardId = async (ctx: Context, title: string) => {
  return (
    await ctx.prisma.board.findFirst({
      where: { title: title },
      select: { id: true },
    })
  )?.id;
};

export const getTestColumnId = async (ctx: Context, title: string) => {
  return (
    await ctx.prisma.column.findFirst({
      where: { title: title },
      select: { id: true },
    })
  )?.id;
};

export const getTestTaskId = async (ctx: Context, title: string) => {
  return (
    await ctx.prisma.task.findFirst({
      where: { title: title },
      select: { id: true },
    })
  )?.id;
};
