'use client';

import Image from 'next/image';

type ImageCardProps = {
  url: string;
  name: string;
};

export default function ImageCard({ url, name }: ImageCardProps) {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden">
      <Image
        src={url}
        alt={`Image Card ${name}`}
        className="w-full h-full object-cover"
        width={10000}
        height={10000}
      />
    </div>
  );
}
