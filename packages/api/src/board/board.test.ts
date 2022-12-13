import { expect, test, beforeEach, afterEach } from 'vitest';

import { createContext } from '../context';
import {
  USER,
  FIRST_BOARD,
  SECOND_BOARD,
  getTestUserId,
  getTestBoardId,
} from '../utils';
import { BoardsService } from './service';

const ctx = await createContext();
const boardsService = new BoardsService(ctx);

beforeEach(async () => {
  await ctx.prisma.user.create({
    data: { name: USER.name },
  });

  const userId = await getTestUserId(ctx, USER.name);

  await ctx.prisma.board.create({
    data: {
      userId: userId!,
      title: FIRST_BOARD.title,
      order: FIRST_BOARD.order,
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
});

test('getUserBoards should return one board', async () => {
  const userId = await getTestUserId(ctx, USER.name);
  const boards = await boardsService.getUserBoards(userId!);

  expect(boards).toHaveLength(1);
  expect(boards[0]).toMatchObject({
    title: FIRST_BOARD.title,
    order: FIRST_BOARD.order,
    userId: userId,
  });
});

test('getBoardById should return board', async () => {
  const userId = await getTestUserId(ctx, USER.name);
  const boardId = await getTestBoardId(ctx, FIRST_BOARD.title);

  const board = await boardsService.getBoardById(boardId!);
  expect(board).toMatchObject({
    title: FIRST_BOARD.title,
    order: FIRST_BOARD.order,
    userId: userId,
  });
});

test('createBoard should return new board', async () => {
  const userId = await getTestUserId(ctx, USER.name);

  const board = await boardsService.createBoard({
    title: SECOND_BOARD.title,
    order: SECOND_BOARD.order,
    userId: userId!,
  });

  expect(board).toMatchObject({
    title: SECOND_BOARD.title,
    order: SECOND_BOARD.order,
    userId: userId!,
  });
});

test('updateBoard should return updated board', async () => {
  const boardId = await getTestBoardId(ctx, FIRST_BOARD.title);

  const board = await boardsService.updateBoard(boardId!, {
    title: SECOND_BOARD.title,
    order: SECOND_BOARD.order,
  });
  expect(board).toMatchObject({
    title: SECOND_BOARD.title,
    order: SECOND_BOARD.order,
  });
});

test('deleteBoard should delete the board', async () => {
  const boardId = await getTestBoardId(ctx, FIRST_BOARD.title);
  const userId = await getTestUserId(ctx, USER.name);

  const board = await boardsService.deleteBoard(boardId!);
  expect(board).toMatchObject({
    title: FIRST_BOARD.title,
    order: FIRST_BOARD.order,
    userId: userId,
  });

  const deletedBoard = await ctx.prisma.board.findFirst({
    where: { id: boardId },
  });
  expect(deletedBoard).toBeNull();
});
