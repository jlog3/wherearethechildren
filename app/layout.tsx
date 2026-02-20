// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Where Are The Children? | Official Data on Missing Foster Kids',
  description: 'The government removes thousands of newborns every year. Then it loses track of many of them. Here is the official data they publish — and what they deliberately hide.',
  keywords: 'foster care, missing children, CPS, child protective services, OIG audit, newborn removal, foster accountability, petition',
  openGraph: {
    title: 'Where Are The Children?',
    description: '69% of missing-from-care episodes go unreported. Sign the petition for the Newborn & Foster Child Accountability Act.',
    url: 'https://wherearethechildren.net',
    siteName: 'Where Are The Children?',
    images: [
      {
        url: 'https://wherearethechildren.net/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Where Are The Children? — Demand Public Tracking',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Where Are The Children?',
    description: '69% of missing foster care episodes go unreported. The black box must be opened.',
    images: ['https://wherearethechildren.net/og-image.jpg']
  },
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} bg-[#0A1428] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
