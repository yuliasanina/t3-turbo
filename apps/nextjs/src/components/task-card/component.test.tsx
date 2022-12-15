import type { inferProcedureOutput } from '@trpc/server';
import { describe, expect, test } from 'vitest';

import type { AppRouter } from '@test/api';
import { render, screen } from '@testing-library/react';

import { TaskCard } from './component';

const task: inferProcedureOutput<AppRouter['post']['all']>[number] = {
  id: '1',
  title: 'Test title',
  content: 'test content',
};

describe('TaskCard', () => {
  test('renders component', () => {
    const { baseElement } = render(<TaskCard post={task} />);
    expect(baseElement).toBeTruthy();

    expect(screen.getByText(task.title)).toBeDefined();
    expect(screen.getByText(task.content)).toBeDefined();
  });

  test('renders component without description', () => {
    render(
      <TaskCard
        post={{
          id: '2',
          title: 'Test title',
          content: 'test content', // remove it
        }}
      />
    );

    expect(screen.getByText(task.title)).toBeDefined();
    // expect(screen.getByText(task.content)).not.toBeDefined();
  });
});
