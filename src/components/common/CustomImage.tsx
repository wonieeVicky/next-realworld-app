'use client';
import { DEFAULT_IMAGE_SOURCE } from '@/lib/utils/contants';
import handleBrokenImage from '@/lib/utils/handleBrokenImage';

interface CustomImageProps {
  src: string;
  alt: string;
  className?: string;
}

const CustomImage = ({ src, alt, className }: CustomImageProps) => (
  <img
    data-sizes="auto"
    data-src={src}
    src={DEFAULT_IMAGE_SOURCE}
    alt={alt}
    className={className ? `${className} lazyload` : `lazyload`}
    onError={handleBrokenImage}
  />
);

export default CustomImage;
