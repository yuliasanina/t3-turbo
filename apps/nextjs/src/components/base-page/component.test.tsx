import { describe, expect, test } from 'vitest';

import { render, screen } from '@testing-library/react';

import { BasePage } from './component';

describe('BasePage', () => {
  test('renders component', () => {
    const { baseElement } = render(
      <BasePage title="Test title">
        <div>Test children</div>
      </BasePage>
    );
    expect(baseElement).toBeTruthy();

    expect(screen.getByText('Test title')).toBeDefined();
    expect(screen.getByText('Test children')).toBeDefined();
  });
});
