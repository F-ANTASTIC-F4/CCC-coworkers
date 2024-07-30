import ThemeProvider from '@/components/theme-provider';
import Logo from '@/public/icons/logo_coworkers.svg';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Link from 'next/link';

import './globals.css';

const pretendardFont = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  preload: true,
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

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
        <ThemeProvider
          attribute="class"
          // NOTE - 기본적으로 다크모드로 설정하였습니다.
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <nav className="fixed top-0 z-50 flex h-[60px] w-full items-center bg-background-secondary">
            <div className="flex h-full w-full items-center justify-between px-4 py-5 xl:mx-auto xl:w-[1200px] xl:p-0">
              <Link href="/">
                {/* REVIEW - svgr vs Nextjs Image 태그 */}
                <Logo className="h-[20px] w-[102px] xl:h-[32px] xl:w-[158px]" />
              </Link>
              <Link href="/test" className="text-base font-semibold">
                로그인
              </Link>
            </div>
          </nav>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
