import '@/styles/globals.css';

import { Suspense } from 'react';

import { Providers } from '@/redux/provider';

import Header from './_components/Header';
import Sidebar from './_components/layout/Sidebar';
import Loading from './loading';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<Loading />}>
          <Providers>
            <div className="main-layout">
              <div className="layout-inner">
                <div className="layout-container">
                  <Sidebar />
                  <div className="content-container">
                    <Header />
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
