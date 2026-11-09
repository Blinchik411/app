import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Button } from './button';

const meta = { component: Button, args: { children: 'Button' } } satisfies Meta<typeof Button>;
export default meta;

export const Default: StoryObj<typeof meta> = {};
export const Outline: StoryObj<typeof meta> = { args: { variant: 'outline' } };
