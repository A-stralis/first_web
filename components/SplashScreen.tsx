import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Wait for the "writing" animation (2.5s) plus a small hold
    const holdTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2800);

    // Unmount after fade out transition (1s)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3800);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-stone-50 flex items-center justify-center transition-opacity duration-1000 ease-in-out ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="relative">
        <h1 className="font-handwriting text-8xl md:text-9xl text-stone-900 relative z-10 overflow-hidden whitespace-nowrap animate-write pb-4 pr-2">
          hello
        </h1>
        {/* Cursor effect (optional) */}
        {/* <div className="absolute right-0 top-0 bottom-0 w-1 bg-stone-900 animate-pulse"></div> */}
      </div>
    </div>
  );
};