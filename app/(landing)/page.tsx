'use client';

import { Footer } from '@/components/landing/footer';
import { Header } from '@/components/landing/header';
import ImageCard from '@/components/landing/image-card';
import { mockImages } from '@/components/landing/mock-images';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              className="inline-flex font-mono items-center rounded-full border border-border/50 bg-muted/50 px-4 py-2 text-sm font-medium text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Zap className="mr-2 h-4 w-4 text-yellow-500" />
              Transform your screenshots into stunning visuals
            </motion.div>

            <motion.h1
              className="text-4xl font-bold font-mono tracking-tight text-foreground sm:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Breathe Life Into Your
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {' '}
                Images
              </span>
            </motion.h1>

            <motion.p
              className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl max-w-3xl mx-auto font-mono"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Turn static captures into polished graphics with stunning
              backgrounds, sleek frames, and studio-quality effects.
            </motion.p>

            <motion.div
              className="mt-10 flex items-center justify-center gap-4 flex-col sm:flex-row font-mono"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Link href="/editor">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button size="lg">
                    Start Creating Now
                    <ArrowRight className="size-5" />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>
        <div className="columns-1 md:columns-2 xl:columns-3 gap-6 space-y-6 mt-12 px-10">
          {mockImages.map((image, index) => (
            <ImageCard
              key={index}
              url={image.url}
              name={image.name}
              index={index}
            />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
