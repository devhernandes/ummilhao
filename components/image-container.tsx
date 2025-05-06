import Image from "next/image";

interface ImageContainerProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}

export default function ImageContainer({ src, alt, width, height, priority }: ImageContainerProps) {
  return (
    <div className="relative w-full max-w-2xl aspect-square">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="mx-auto"
        priority={priority}
      />
      <div className="absolute inset-0 bg-purple-600/20 rounded-full blur-3xl -z-10"></div>
    </div>
  );
}