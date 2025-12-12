import React from 'react';

interface VerticalSidebarProps {
  text: string;
  position: 'left' | 'right';
}

export const VerticalSidebar: React.FC<VerticalSidebarProps> = ({ text, position }) => {
  return (
    <div 
      className={`fixed top-0 bottom-0 flex flex-col justify-center items-center w-16 md:w-24 z-10 pointer-events-none
        ${position === 'left' ? 'left-0 border-r border-stone-200/50' : 'right-0 border-l border-stone-200/50'}
        hidden md:flex
      `}
    >
      <div className="vertical-text font-serif text-2xl md:text-3xl font-bold text-stone-800 opacity-80 select-none">
        {text}
      </div>
    </div>
  );
};