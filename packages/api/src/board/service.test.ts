import { expect, test, beforeEach, afterEach, afterAll } from 'vitest';

import { createContext } from '../context';
import { BoardsService } from './service';

const userName = 'Test user';
const firstBoard = {
  title: 'hello test 1',
  order: 1,
};
const secondBoard = {
  title: 'hello test 2',
  order: 2,
};

const ctx = await createContext();
const boardsService = new BoardsService(ctx);

afterEach(async () => {
  await ctx.prisma.board.deleteMany();
});

const getTestUserId = async () => {
  return (
    await ctx.prisma.user.findFirst({
      where: { name: userName },
      select: { id: true },
    })
  )?.id;
};

beforeEach(async () => {
  await ctx.prisma.user.create({
    data: { name: userName },
  });

  const userId = await getTestUserId();

  if (!userId) return;

  await ctx.prisma.board.create({
    data: { title: firstBoard.title, order: firstBoard.order, userId: userId },
  });
});

const getBoardById = async () => {
  return (
    await ctx.prisma.board.findFirst({
      where: { title: firstBoard.title },
      select: { id: true },
    })
  )?.id;
};

test('getUserBoards should return one board', async () => {
  const userId = await getTestUserId();
  const boards = await boardsService.getUserBoards(userId!);

  expect(boards).toHaveLength(1);
  expect(boards[0]).toMatchObject({
    title: firstBoard.title,
    order: firstBoard.order,
    userId: userId,
  });
});

test('getBoardById should return board', async () => {
  const userId = await getTestUserId();
  const boardId = await getBoardById();

  const board = await boardsService.getBoardById(boardId!);
  expect(board).toMatchObject({
    title: firstBoard.title,
    order: firstBoard.order,
    userId: userId,
  });
});

test('createBoard should return new board', async () => {
  const userId = await getTestUserId();

  const board = await boardsService.createBoard({
    title: secondBoard.title,
    order: secondBoard.order,
    userId: userId!,
  });

  expect(board).toMatchObject({
    title: secondBoard.title,
    order: secondBoard.order,
    userId: userId!,
  });
});

test('updateBoard should return updated board', async () => {
  const boardId = await getBoardById();

  const board = await boardsService.updateBoard({
    id: boardId!,
    title: secondBoard.title,
    order: secondBoard.order,
  });
  expect(board).toMatchObject({
    title: secondBoard.title,
    order: secondBoard.order,
  });
});

test('deleteBoard should delete the board', async () => {
  const boardId = await getBoardById();
  const userId = await getTestUserId();

  const board = await boardsService.deleteBoard(boardId!);
  expect(board).toMatchObject({
    title: firstBoard.title,
    order: firstBoard.order,
    userId: userId,
  });

  const isDeleted = await ctx.prisma.board.findFirst({
    where: { id: boardId },
  });
  expect(isDeleted).toBeNull();
});
