'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

type ImageCardProps = {
  url: string;
  name: string;
  index?: number;
};

export default function ImageCard({ url, name, index = 0 }: ImageCardProps) {
  return (
    <motion.div
      className="w-full h-full rounded-2xl overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        scale: 1.02,
        y: -8,
        transition: {
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      }}
      whileTap={{
        scale: 0.98,
        transition: {
          duration: 0.1,
        },
      }}
    >
      <motion.div
        className="w-full h-full"
        whileHover={{
          scale: 1.02,
          transition: {
            duration: 0.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        }}
      >
        <Image
          src={url}
          alt={`Image Card ${name}`}
          className="w-full h-full object-cover"
          width={10000}
          height={10000}
        />
      </motion.div>
    </motion.div>
  );
}
