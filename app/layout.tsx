import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';

import { Providers } from '@/redux/provider';
import ReactQueryProviders from '@/utils/react-query-provider';

import Header from './_components/Header';
import Sidebar from './_components/layout/Sidebar';
import WirteModal from './_components/modal/WriteModal';
import Loading from './loading';

const Tag = dynamic(
  () => import('./_components/Tag').then(mod => mod.default),
  { ssr: false }
);

export const metadata = {
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProviders>
          <Suspense fallback={<Loading />}>
            <Providers>
              <div className="main-layout">
                <div className="layout-inner">
                  <div className="layout-container">
                    <Sidebar />
                    <div className="content-container">
                      <Header />
                      <WirteModal />
                      <ToastContainer />
                      {children}
                    </div>
                    <Tag />
                  </div>
                </div>
              </div>
            </Providers>
          </Suspense>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
