import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Providers from '@/components/providers/providers';
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.niceshot.fun'),
  title: {
    default: 'NiceShot - Turn screenshots into beautiful visuals',
    template: '%s | NiceShot',
    absolute: 'NiceShot',
  },
  description:
    'Want stunning social posts? NiceShot makes your screenshots pop in just a few clicks!',
  openGraph: {
    url: 'https://www.niceshot.fun',
    siteName: 'NiceShot',
  },
  keywords: [
    'niceshot.fun',
    'nice shot',
    'nice shot app',
    'nice shot app',
    'Photography',
    'NiceShot',
    'screenshot background tool',
    'screenshot enhancer',
    'ui mockup generator',
    'social media mockup',
    'nice shot app',
    'product screenshot design',
    'image background editor',
    'visual content tool',
    'design tool for startups',
    'marketing image generator',
    'landing page screenshots',
    'create stunning UI shots',
    'mockup tool for SaaS',
    'app screenshot mockup',
    'drag and drop mockup creator',
    'generate product visuals',
    'automated screenshot styling',
    'social media post designer',
    'no code design tool',
    'create UI previews online',
    'beautiful background generator',
    'design screenshots for marketing',
  ],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-mono`}
      >
        <Providers>
          <main>{children}</main>
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
