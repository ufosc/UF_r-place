import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UF r/place',
  description: 'Simple r/place clone frontend',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
