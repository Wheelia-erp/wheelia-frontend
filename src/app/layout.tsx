import './globals.css';
import { Inter } from 'next/font/google';
import { Auth0ProviderWithNavigate } from '@/auth/auth0-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Wheelia',
  description: 'Frontend multitenant com Auth0',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Auth0ProviderWithNavigate>{children}</Auth0ProviderWithNavigate>
      </body>
    </html>
  );
}
