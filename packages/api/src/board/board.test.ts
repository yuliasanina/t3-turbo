import { expect, test, beforeEach, afterAll, afterEach } from 'vitest';

import { createContext } from '../context';
import { USER, FIRST_BOARD, SECOND_BOARD } from '../test.constants';
import { BoardsService } from './service';

const ctx = await createContext();
const boardsService = new BoardsService(ctx);

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
  const userId = await getUserId();
  const boards = await boardsService.getUserBoards(userId!);

  console.log(boards);
  expect(boards).toHaveLength(1);
  expect(boards[0]).toMatchObject({
    title: FIRST_BOARD.title,
    order: FIRST_BOARD.order,
    userId: userId,
  });
});

test('getBoardById should return board', async () => {
  const userId = await getUserId();
  const boardId = await getBoardById();

  const board = await boardsService.getBoardById(boardId!);
  expect(board).toMatchObject({
    title: FIRST_BOARD.title,
    order: FIRST_BOARD.order,
    userId: userId,
  });
});

test('createBoard should return new board', async () => {
  const userId = await getUserId();

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
  const boardId = await getBoardById();

  const board = await boardsService.updateBoard({
    id: boardId!,
    title: SECOND_BOARD.title,
    order: SECOND_BOARD.order,
  });
  expect(board).toMatchObject({
    title: SECOND_BOARD.title,
    order: SECOND_BOARD.order,
  });
});

test('deleteBoard should delete the board', async () => {
  const boardId = await getBoardById();
  const userId = await getUserId();

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
