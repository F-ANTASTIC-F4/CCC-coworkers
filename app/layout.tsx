import Header from '@/components/header/Header';
import ServerErrorBoundary from '@/components/server-error-boundary';
import ThemeProvider from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { Provider } from 'jotai';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

import './globals.css';

const pretendardFont = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  preload: true,
  display: 'swap',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

/* eslint-disable react/jsx-no-useless-fragment */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // NOTE - suppressHydrationWarning 추가하여 Extra attributes 오류 해결
    // https://github.com/vercel/next.js/discussions/22388
    <html lang="en" suppressHydrationWarning>
      <body className={pretendardFont.className}>
        <Provider>
          <ThemeProvider
            attribute="class"
            // NOTE - 기본적으로 다크모드로 설정하였습니다.
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <ServerErrorBoundary>
              {children}
              <Toaster />
            </ServerErrorBoundary>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
