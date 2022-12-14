import type { inferProcedureOutput } from '@trpc/server';
import { describe, expect, it } from 'vitest';

import type { AppRouter } from '@test/api';
import { render, screen } from '@testing-library/react';

import { TaskCard } from './component';

const task: inferProcedureOutput<AppRouter['post']['all']>[number] = {
  id: '1',
  title: 'Test title',
  content: 'test content',
};

describe('TaskCard', () => {
  it('renders component', () => {
    const { baseElement } = render(<TaskCard post={task} />);
    expect(baseElement).toBeTruthy();

    expect(screen.getByText(task.title)).toBeDefined();
    expect(screen.getByText(task.content)).toBeDefined();
  });
});
