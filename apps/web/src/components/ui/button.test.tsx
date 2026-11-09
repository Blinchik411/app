import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import { Button } from './button';

it('renders button', () => {
  render(<Button>Click</Button>);
  expect(screen.getByRole('button', { name: 'Click' })).toBeInTheDocument();
});
