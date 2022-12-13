export type TTestUser = {
  name: string;
  email: string;
};

export type TTestBoard = {
  title: string;
  order: number;
};

export type TTestColumn = {
  title: string;
  order: number;
};

export type TTestTask = {
  title: string;
  order: number;
};

export const USER: TTestUser = {
  name: 'Test user',
  email: 'test@test.com',
};

export const FIRST_BOARD: TTestBoard = {
  title: 'test board 1',
  order: 1,
};

export const SECOND_BOARD: TTestBoard = {
  title: 'test board 2',
  order: 2,
};

export const FIRST_COLUMN: TTestColumn = {
  title: 'test column 1',
  order: 1,
};

export const SECOND_COLUMN: TTestColumn = {
  title: 'test column 2',
  order: 2,
};

export const FIRST_TASK: TTestTask = {
  title: 'test task 1',
  order: 1,
};

export const SECOND_TASK: TTestTask = {
  title: 'test task 2',
  order: 2,
};
