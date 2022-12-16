import type { inferProcedureOutput } from '@trpc/server';
import { describe, expect, test } from 'vitest';

import type { AppRouter } from '@test/api';
import { render, screen } from '@testing-library/react';

import { TaskCard } from './component';

const task: inferProcedureOutput<AppRouter['task']['all']>[number] = {
  id: 2,
  title: 'Test title',
  description: 'test content',
  order: 2,
  columnId: 2,
};

describe('TaskCard', () => {
  test('renders component', () => {
    const { baseElement } = render(<TaskCard task={task} />);
    expect(baseElement).toBeTruthy();

    expect(screen.getByText(task.title)).toBeDefined();
    expect(screen.getByText('test content')).toBeDefined();
  });
});
