import type { Metadata } from 'next';

import { Header } from '@/components/sections';

import Cursor from '@/components/cursor/cursor';

export default function ProjectLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <>
          <div className="flex min-h-[100dvh] flex-col">
              <Header/>
              {children}
          </div>
          <Cursor/></>
  );
}
