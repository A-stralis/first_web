import React, { useState, useEffect } from 'react';
import { VerticalSidebar } from './components/VerticalSidebar';
import { LazyImage } from './components/LazyImage';
import { Pagination } from './components/Pagination';
import { Lightbox } from './components/Lightbox';
import { PrivacyModal } from './components/PrivacyModal';
import { SplashScreen } from './components/SplashScreen';
import { Photo } from './types';

// Constants
const ITEMS_PER_PAGE = 60;
const TOTAL_ITEMS = 300; // Mock total database size

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
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
    if (!showSplash) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage, showSplash]);

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
      
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      {/* Vertical Sidebars (The Motto) */}
      <VerticalSidebar text="自强不息" position="left" />
      <VerticalSidebar text="止于至善" position="right" />

      {/* Main Content Area */}
      {/* Increased max-width to accomodate 5 columns while keeping image size roughly similar */}
      <main className={`flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-20 lg:px-24 py-8 transition-opacity duration-1000 ${showSplash ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* Header / Logo */}
        <header className={`flex flex-col items-center justify-center mb-16 transition-all duration-500 ${isScrolled ? 'scale-90 opacity-90' : 'scale-100'}`}>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-stone-900 mb-2 font-sans">
            XDFZ IMAGE
          </h1>
          <div className="h-1 w-24 bg-stone-900 rounded-full my-4"></div>
          <p className="font-smiley text-xl md:text-2xl text-stone-400/80 mt-2 tracking-wide">
            做一个幸福的平凡人
          </p>
        </header>

        {/* Masonry Grid */}
        {/* Updated: xl:columns-5 for 5 columns on larger screens */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-5 gap-4 space-y-4">
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
        <footer className="flex flex-col items-center justify-center py-8 text-stone-400 text-sm font-serif space-y-2">
          <span>&copy; {new Date().getFullYear()} XDFZ PHOTOGRAPHY CLUB. ALL RIGHTS RESERVED.</span>
          <button 
            onClick={() => setIsPrivacyOpen(true)}
            className="hover:text-stone-600 underline underline-offset-4 transition-colors text-xs"
          >
            隐私政策
          </button>
        </footer>

      </main>

      {/* Lightbox Overlay */}
      <Lightbox 
        photo={selectedPhoto} 
        onClose={() => setSelectedPhoto(null)} 
      />
      
      {/* Privacy Policy Modal */}
      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

    </div>
  );
};

export default App;