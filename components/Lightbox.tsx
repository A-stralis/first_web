import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Photo } from '../types';

interface LightboxProps {
  photo: Photo | null;
  onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ photo, onClose }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (photo) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [photo, onClose]);

  if (!photo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/95 backdrop-blur-sm p-4 animate-fade-in" onClick={onClose}>
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 text-white hover:text-stone-300 transition-colors"
      >
        <X size={32} />
      </button>
      <img 
        src={photo.url} 
        alt={photo.id}
        className="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
      />
      <div className="absolute bottom-4 left-0 right-0 text-center text-white/60 font-serif text-sm">
        {photo.id} • {photo.width} × {photo.height}
      </div>
    </div>
  );
};