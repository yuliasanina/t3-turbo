import type { inferProcedureOutput } from '@trpc/server';
import { describe, expect, test } from 'vitest';

import type { AppRouter } from '@test/api';
import { render, screen } from '@testing-library/react';

import { Column } from './component';

const board: inferProcedureOutput<AppRouter['board']['all']>[number] = {
  id: 1,
  title: 'Test title',
  order: 1,
  userId: '123',
};

describe('Column', () => {
  test('renders component', () => {
    const { baseElement } = render(<Column board={board} />);
    expect(baseElement).toBeTruthy();

    // expect(screen.getByText(board.title)).toBeDefined();
  });
});
