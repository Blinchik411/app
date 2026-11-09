import './globals.css';

import type { ReactNode } from 'react';

import { Providers } from './providers';

export const metadata = { title: 'Analog Slack' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
