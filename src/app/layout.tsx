import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/providers';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Orçamento',
  description: 'Meu Orçamento',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Providers>
          <ToastContainer />
          <div className="flex w-full h-full ">
            <Sidebar />
            <div className="w-full">
              <Header />
              <div className="px-4 pt-4">
                <div className="py-4 px-8 border rounded shadow-md h-full min-h-[300px] max-h-[800px] overflow-y-auto">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
