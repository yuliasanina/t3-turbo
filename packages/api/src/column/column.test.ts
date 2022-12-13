import { expect, test, beforeEach, afterEach } from 'vitest';

import { createContext } from '../context';
import {
  USER,
  FIRST_BOARD,
  SECOND_BOARD,
  FIRST_COLUMN,
  SECOND_COLUMN,
} from '../test.constants';
import { ColumnsService } from './service';

const ctx = await createContext();
const columnService = new ColumnsService(ctx);

const getUserId = async () => {
  return (
    await ctx.prisma.user.findFirst({
      where: { name: USER.name },
      select: { id: true },
    })
  )?.id;
};

const getBoardById = async () => {
  return (
    await ctx.prisma.board.findFirst({
      where: { title: FIRST_BOARD.title },
      select: { id: true },
    })
  )?.id;
};

const getColumnById = async () => {
  return (
    await ctx.prisma.column.findFirst({
      where: { title: FIRST_COLUMN.title },
      select: { id: true },
    })
  )?.id;
};

beforeEach(async () => {
  await ctx.prisma.user.create({
    data: { name: USER.name },
  });

  const userId = await getUserId();

  await ctx.prisma.board.create({
    data: {
      userId: userId!,
      title: FIRST_BOARD.title,
      order: FIRST_BOARD.order,
    },
  });

  const boardId = await getBoardById();

  await ctx.prisma.column.create({
    data: {
      boardId: boardId!,
      title: FIRST_COLUMN.title,
      order: FIRST_COLUMN.order,
    },
  });
});

afterEach(async () => {
  await ctx.prisma.board.deleteMany({
    where: { title: { in: [FIRST_BOARD.title, SECOND_BOARD.title] } },
  });

  await ctx.prisma.user.deleteMany({
    where: { name: USER.name },
  });

  await ctx.prisma.column.deleteMany({
    where: { title: { in: [FIRST_COLUMN.title, SECOND_COLUMN.title] } },
  });
});

test('getBoardColumns should return one column', async () => {
  const boardId = await getBoardById();

  const columns = await columnService.getBoardColumns(boardId!);

  expect(columns).toHaveLength(1);

  expect(columns[0]).toMatchObject({
    title: FIRST_COLUMN.title,
    order: FIRST_COLUMN.order,
    boardId: boardId,
  });
});

test('getColumnById should return column', async () => {
  const boardId = await getBoardById();
  const columnId = await getColumnById();

  const column = await columnService.getColumnById(columnId!);
  expect(column).toMatchObject({
    title: FIRST_COLUMN.title,
    order: FIRST_COLUMN.order,
    boardId: boardId,
  });
});

test('createColumn should return new column', async () => {
  const boardId = await getBoardById();

  const column = await columnService.createColumn({
    title: SECOND_COLUMN.title,
    order: SECOND_COLUMN.order,
    boardId: boardId!,
  });

  expect(column).toMatchObject({
    title: SECOND_BOARD.title,
    order: SECOND_BOARD.order,
    boardId: boardId!,
  });
});

test('updateColumn should return updated column', async () => {
  const columnId = await getColumnById();

  const column = await columnService.updateColumn({
    id: columnId!,
    title: SECOND_BOARD.title,
    order: SECOND_BOARD.order,
  });
  expect(column).toMatchObject({
    title: SECOND_BOARD.title,
    order: SECOND_BOARD.order,
  });
});

test('deleteColumn should delete the column', async () => {
  const columnId = await getColumnById();
  const boardId = await getBoardById();

  const column = await columnService.deleteColumn(columnId!);
  expect(column).toMatchObject({
    title: FIRST_COLUMN.title,
    order: FIRST_COLUMN.order,
    boardId: boardId,
  });

  const deletedColumn = await ctx.prisma.column.findFirst({
    where: { id: columnId },
  });

  expect(deletedColumn).toBeNull();

  const columns = await columnService.getBoardColumns(boardId!);
  expect(columns).toHaveLength(0);
});
