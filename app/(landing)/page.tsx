'use client';

import { Footer } from '@/components/landing/footer';
import { Header } from '@/components/landing/header';
import ImageCard from '@/components/landing/image-card';
import { mockImages } from '@/components/landing/mock-images';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';
import HeroVideoDialog from '@/components/magicui/hero-video-dialog';
import { BorderBeam } from '@/components/magicui/border-beam';
import ImageComparisonShowcase from '@/components/landing/image-comparison-showcase';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              className="inline-flex font-mono items-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link
                href="https://www.producthunt.com/products/niceshot?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-niceshot"
                target="_blank"
              >
                <Image
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1000989&theme=light&t=1754326167242"
                  alt="NiceShot - Turn&#0032;dull&#0032;screenshots&#0032;into&#0032;stunning&#0032;visuals | Product Hunt"
                  width={250}
                  height={54}
                />
              </Link>
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

        <motion.div
          className="relative flex justify-center max-w-6xl mx-auto mt-16 mb-12 rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.89 }}
        >
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.89 }}
          >
            <HeroVideoDialog
              videoSrc="https://www.youtube.com/embed/zsSkoIR-acs?si=zNWO_EeK70o8rBfM"
              thumbnailSrc="/landing-white.png"
              thumbnailAlt="Product demo video"
              className="max-w-6xl block dark:hidden"
            />
            <HeroVideoDialog
              videoSrc="https://www.youtube.com/embed/zsSkoIR-acs?si=zNWO_EeK70o8rBfM"
              thumbnailSrc="/twitter-image.png"
              thumbnailAlt="Product demo video"
              className="max-w-6xl hidden dark:block"
            />
          </motion.div>
          <BorderBeam
            size={300}
            duration={15}
            className="absolute top-0 left-0 h-full"
          />
        </motion.div>

        <section className="pt-20 bg-muted/30">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold font-mono tracking-tight text-foreground sm:text-4xl mb-4">
              Your Images{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Reimagined
              </span>
            </h2>
            <p className="text-lg text-muted-foreground font-mono max-w-2xl mx-auto">
              {`A glimpse of what’s possible with just a few clicks.`}
            </p>
          </motion.div>
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
      </section>

      <ImageComparisonShowcase />
      <Footer />
    </div>
  );
}
