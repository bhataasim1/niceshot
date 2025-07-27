import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'NiceShot - Turn screenshots into beautiful visuals',
    short_name: 'NiceShot',
    description:
      'Nice Shot helps you turn plain screenshots into beautiful, share-worthy visuals - instantly. Perfect for product mockups, social posts, and portfolios.',
    start_url: '/',
    display: 'standalone',
    categories: [
      'productivity',
      'design',
      'social-media',
      'image-editing',
      'image-generation',
      'mockup',
      'gradient backgrounds',
    ],
    background_color: '#171717',
    icons: [
      {
        src: '/icon-maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon2.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: '/icon1.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    screenshots: [
      {
        src: '/opengraph-image.png',
        type: 'image/png',
        sizes: '1200x630',
      },
    ],
  };
}
