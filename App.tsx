import React, { useState, useEffect, useMemo } from 'react';
import { Camera } from 'lucide-react';
import { VerticalSidebar } from './components/VerticalSidebar';
import { LazyImage } from './components/LazyImage';
import { Pagination } from './components/Pagination';
import { Lightbox } from './components/Lightbox';
import { Photo } from './types';

// Constants
const ITEMS_PER_PAGE = 60;
const TOTAL_ITEMS = 300; // Mock total database size

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Generate Mock Data based on page
  // In a real app, this would be a fetch call to an API
  useEffect(() => {
    const generatePhotos = () => {
      const newPhotos: Photo[] = Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => {
        const globalIndex = (currentPage - 1) * ITEMS_PER_PAGE + index;
        // Random aspect ratio logic to simulate real photography (portrait, landscape, square)
        const width = 800;
        // Generate heights between 500 and 1200
        const height = Math.floor(Math.random() * (1200 - 500 + 1) + 500); 
        const aspectRatio = width / height;
        
        return {
          id: `PHOTO-${globalIndex + 1}`,
          // Using picsum with specific seeds to ensure images stay consistent
          url: `https://picsum.photos/seed/${globalIndex + 100}/${width}/${height}`,
          width,
          height,
          aspectRatio
        };
      });
      setPhotos(newPhotos);
    };

    generatePhotos();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Handle Scroll for Header Styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalPages = Math.ceil(TOTAL_ITEMS / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col relative">
      
      {/* Vertical Sidebars (The Motto) */}
      <VerticalSidebar text="自强不息" position="left" />
      <VerticalSidebar text="止于至善" position="right" />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-28 lg:px-32 py-8 transition-all duration-300">
        
        {/* Header / Logo */}
        <header className={`flex flex-col items-center justify-center mb-16 transition-all duration-500 ${isScrolled ? 'scale-90 opacity-90' : 'scale-100'}`}>
          <div className="w-16 h-16 bg-black text-white flex items-center justify-center rounded-full mb-6 shadow-lg">
            <Camera size={32} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-stone-900 mb-2 font-sans">
            XDFZ IMAGE
          </h1>
          <div className="h-1 w-24 bg-stone-900 rounded-full my-4"></div>
          <p className="text-stone-500 font-serif italic text-lg">
            Capturing Moments, Eternalizing Memories
          </p>
        </header>

        {/* Masonry Grid */}
        {/* We use CSS columns for true masonry layout. 
            'break-inside-avoid' on the child prevents images from being split across columns. */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {photos.map((photo) => (
            <div key={photo.id} className="break-inside-avoid">
              <LazyImage 
                src={photo.url} 
                alt={photo.id}
                aspectRatio={photo.aspectRatio}
                onClick={() => setSelectedPhoto(photo)}
              />
            </div>
          ))}
        </div>

        {/* Pagination */}
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
        
        {/* Footer */}
        <footer className="text-center py-8 text-stone-400 text-sm font-serif">
          &copy; {new Date().getFullYear()} XDFZ PHOTOGRAPHY CLUB. ALL RIGHTS RESERVED.
        </footer>

      </main>

      {/* Lightbox Overlay */}
      <Lightbox 
        photo={selectedPhoto} 
        onClose={() => setSelectedPhoto(null)} 
      />

    </div>
  );
};

export default App;