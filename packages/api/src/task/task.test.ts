import { expect, test, beforeEach, afterEach } from 'vitest';

import { createContext } from '../context';
import {
  USER,
  FIRST_BOARD,
  FIRST_COLUMN,
  SECOND_COLUMN,
  FIRST_TASK,
  SECOND_TASK,
  getTestUserId,
  getTestBoardId,
  getTestColumnId,
  getTestTaskId,
  createTestUser,
  createTestBoard,
  createTestColumn,
  createTestTask,
} from '../utils';
import { TaskService } from './service';

const ctx = await createContext();
const taskService = new TaskService(ctx);

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
  const columnId = await getTestColumnId(ctx, FIRST_COLUMN.title);

  await createTestTask({
    ctx,
    columnId: columnId!,
    task: FIRST_TASK,
  });
});

afterEach(async () => {
  await ctx.prisma.user.deleteMany({
    where: { name: USER.name },
  });

  await ctx.prisma.board.deleteMany({
    where: { title: FIRST_BOARD.title },
  });

  await ctx.prisma.column.deleteMany({
    where: { title: { in: [FIRST_COLUMN.title, SECOND_COLUMN.title] } },
  });

  await ctx.prisma.task.deleteMany({
    where: { title: { in: [FIRST_TASK.title, SECOND_TASK.title] } },
  });
});

test('getColumnTasks should return one task', async () => {
  const columnId = await getTestColumnId(ctx, FIRST_COLUMN.title);
  const tasks = await taskService.getColumnTasks(columnId!);

  expect(tasks).toHaveLength(1);

  expect(tasks[0]).toMatchObject({
    title: FIRST_TASK.title,
    order: FIRST_TASK.order,
    columnId: columnId,
  });
});

test('getTaskById should return task', async () => {
  const columnId = await getTestColumnId(ctx, FIRST_COLUMN.title);
  const taskId = await getTestTaskId(ctx, FIRST_TASK.title);
  const task = await taskService.getTaskById(taskId!);

  expect(task).toMatchObject({
    title: FIRST_TASK.title,
    order: FIRST_TASK.order,
    columnId: columnId,
  });
});

test('createTask should return new task', async () => {
  const columnId = await getTestColumnId(ctx, FIRST_COLUMN.title);
  const newTask = {
    title: SECOND_TASK.title,
    order: SECOND_TASK.order,
    columnId: columnId!,
  };

  const task = await taskService.createTask(newTask);
  expect(task).toMatchObject(newTask);
});

test('updateTask should return updated task', async () => {
  const taskId = await getTestTaskId(ctx, FIRST_TASK.title);

  const task = await taskService.updateTask(taskId!, {
    description: 'Test description',
  });

  expect(task).toMatchObject({
    title: FIRST_TASK.title,
    order: FIRST_TASK.order,
    description: 'Test description',
  });
});

test('deleteTask should delete the task', async () => {
  const columnId = await getTestColumnId(ctx, FIRST_COLUMN.title);
  const taskId = await getTestTaskId(ctx, FIRST_TASK.title);

  const task = await taskService.deleteTask(taskId!);
  expect(task).toMatchObject({
    title: FIRST_TASK.title,
    order: FIRST_TASK.order,
    columnId: columnId,
  });

  const deletedTask = await ctx.prisma.task.findFirst({
    where: { id: taskId },
  });

  expect(deletedTask).toBeNull();

  const tasks = await taskService.getColumnTasks(columnId!);
  expect(tasks).toHaveLength(0);
});
