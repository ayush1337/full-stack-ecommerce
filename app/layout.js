import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import Providers from '@/lib/provider';
import Notifications from '@/components/Notifications';
import AuthSession from '@/components/auth/AuthSession';
import Bodywrapper from '@/components/Bodywrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ZARA India | New Collection Online',
  description: 'ZARA India | New Collection Online',
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={
          (inter.className, `overflow-x-hidden tracking-wide box-border `)
        }
        suppressHydrationWarning={true}
      >
        <AuthSession>
          <Providers>
            <Bodywrapper>
              <Header />
              {children}
              <Footer />
            </Bodywrapper>
            <Notifications />
          </Providers>
        </AuthSession>
      </body>
    </html>
  );
}
