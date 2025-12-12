import React, { useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio: number;
  onClick?: () => void;
}

export const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className = "", aspectRatio, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div 
      className={`relative overflow-hidden bg-stone-200 mb-4 cursor-zoom-in group ${className}`}
      style={{ paddingBottom: `${(1 / aspectRatio) * 100}%` }}
      onClick={onClick}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-700 ease-in-out
          ${isLoaded ? 'opacity-100 scale-100 grayscale-0' : 'opacity-0 scale-105 grayscale'}
          group-hover:scale-105
        `}
      />
      {/* Loading Skeleton/Overlay */}
      <div className={`absolute inset-0 bg-stone-200 transition-opacity duration-500 ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} />
    </div>
  );
};