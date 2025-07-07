import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jewelry Store',
  description: 'Browse our collection of beautiful engagement rings',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-avenir">{children}</body>
    </html>
  );
} 