import { expect, test, beforeEach, afterEach } from 'vitest';

import { createContext } from '../context';
import {
  USER,
  FIRST_BOARD,
  FIRST_COLUMN,
  SECOND_COLUMN,
  getTestUserId,
  getTestBoardId,
  getTestColumnId,
  createTestUser,
  createTestBoard,
  createTestColumn,
} from '../utils';
import { ColumnsService } from './service';

const ctx = await createContext();
const columnService = new ColumnsService(ctx);

beforeEach(async () => {
  await createTestUser(ctx, USER.name);
  const userId = await getTestUserId(ctx, USER.name);

  await createTestBoard({ ctx, userId: userId!, board: FIRST_BOARD });
  const boardId = await getTestBoardId(ctx, FIRST_BOARD.title);

  await createTestColumn({
    ctx,
    boardId: boardId!,
    column: FIRST_COLUMN,
  });
});

afterEach(async () => {
  await ctx.prisma.board.deleteMany({
    where: { title: FIRST_BOARD.title },
  });

  await ctx.prisma.user.deleteMany({
    where: { name: USER.name },
  });

  await ctx.prisma.column.deleteMany({
    where: { title: { in: [FIRST_COLUMN.title, SECOND_COLUMN.title] } },
  });
});

test('getBoardColumns should return one column', async () => {
  const boardId = await getTestBoardId(ctx, FIRST_BOARD.title);

  const columns = await columnService.getBoardColumns(boardId!);

  expect(columns).toHaveLength(1);

  expect(columns[0]).toMatchObject({
    title: FIRST_COLUMN.title,
    order: FIRST_COLUMN.order,
    boardId: boardId,
  });
});

test('getColumnById should return column', async () => {
  const boardId = await getTestBoardId(ctx, FIRST_BOARD.title);
  const columnId = await getTestColumnId(ctx, FIRST_COLUMN.title);

  const column = await columnService.getColumnById(columnId!);
  expect(column).toMatchObject({
    title: FIRST_COLUMN.title,
    order: FIRST_COLUMN.order,
    boardId: boardId,
  });
});

test('createColumn should return new column', async () => {
  const boardId = await getTestBoardId(ctx, FIRST_BOARD.title);

  const column = await columnService.createColumn({
    title: SECOND_COLUMN.title,
    order: SECOND_COLUMN.order,
    boardId: boardId!,
  });

  expect(column).toMatchObject({
    title: SECOND_COLUMN.title,
    order: SECOND_COLUMN.order,
    boardId: boardId!,
  });
});

test('updateColumn should return updated column', async () => {
  const columnId = await getTestColumnId(ctx, FIRST_COLUMN.title);

  const column = await columnService.updateColumn(columnId!, {
    title: SECOND_COLUMN.title,
    order: SECOND_COLUMN.order,
  });
  expect(column).toMatchObject({
    title: SECOND_COLUMN.title,
    order: SECOND_COLUMN.order,
  });
});

test('deleteColumn should delete the column', async () => {
  const columnId = await getTestColumnId(ctx, FIRST_COLUMN.title);
  const boardId = await getTestBoardId(ctx, FIRST_BOARD.title);

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
