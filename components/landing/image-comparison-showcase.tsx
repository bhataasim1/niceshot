'use client';

import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider,
} from '@/components/motion-primitives/image-comparison';
import { motion } from 'motion/react';

const images = [
  {
    id: 1,
    before: '/comparison/landing-white-after.png',
    after: '/landing-white.png',
    alt: 'Niceshot Light',
  },
  {
    id: 2,
    before: '/comparison/landing-dark-after.png',
    after: '/twitter-image.png',
    alt: 'Niceshot Dark',
  },
  {
    id: 3,
    before: '/comparison/payment-after.png',
    after: '/comparison/payment-before.png',
    alt: 'Payment',
  },
];

export default function ImageComparisonShowcase() {
  return (
    <section className="py-10 bg-muted/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold font-mono tracking-tight text-foreground sm:text-4xl mb-4">
            Before vs{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              After
            </span>
          </h2>
          <p className="text-lg text-muted-foreground font-mono max-w-2xl mx-auto">
            Drag the slider to see how Niceshot brings life to your images The
            Niceshot Effect
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {images.map((image) => {
            return (
              <div key={image.id} className="mb-6 flex flex-col items-center">
                <h3 className="text-lg font-bold font-mono tracking-tight text-foreground sm:text-2xl mb-4">
                  {image.id}
                </h3>
                <ImageComparison
                  className="aspect-16/9 w-full rounded-lg border border-zinc-200 dark:border-zinc-800"
                  enableHover
                  springOptions={{
                    bounce: 0.3,
                  }}
                >
                  <ImageComparisonImage
                    src={image.before}
                    alt={image.alt}
                    position="left"
                  />
                  <ImageComparisonImage
                    src={image.after}
                    alt={image.alt}
                    position="right"
                  />
                  <ImageComparisonSlider className="w-0.5 bg-white/30 backdrop-blur-xs" />
                </ImageComparison>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
