import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ZARA India | New Collection Online',
  description: 'ZARA India | New Collection Online',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="overflow-x-hidden">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
