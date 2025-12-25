"use client";

import { useRef, useState, useCallback, useEffect } from 'react';
import { Movie } from '../../src/modules/movies/domain/movie';
import { MovieCard } from '../../src/components/MovieCard';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  className?: string;
}

export function MovieRow({ title, movies, className = '' }: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const checkScroll = useCallback(() => {
    if (!rowRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
    setShowLeftButton(scrollLeft > 0);
    setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
  }, []);

  const handleScroll = useCallback((direction: 'left' | 'right') => {
    if (!rowRef.current) return;
    
    const { scrollLeft, clientWidth, scrollWidth } = rowRef.current;
    const scrollAmount = clientWidth * 0.8; // Scroll by 80% of container width
    
    const scrollTo = direction === 'left' 
      ? Math.max(0, scrollLeft - scrollAmount)
      : Math.min(scrollLeft + scrollAmount, scrollWidth - clientWidth);
    
    rowRef.current.scrollTo({ 
      left: scrollTo, 
      behavior: 'smooth' 
    });
  }, []);

  // Check scroll position on mount and when movies change
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    
    checkScroll();
    row.addEventListener('scroll', checkScroll);
    
    // Check again after a short delay to ensure all elements are rendered
    const timer = setTimeout(checkScroll, 300);
    
    return () => {
      row.removeEventListener('scroll', checkScroll);
      clearTimeout(timer);
    };
  }, [movies, checkScroll]);

  if (!movies?.length) return null;

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between px-4 md:px-8 lg:px-12">
        <h2 className="text-lg font-bold text-white md:text-xl">{title}</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => handleScroll('left')}
            className={`rounded-full bg-gray-800/80 p-2 text-white transition-all hover:bg-gray-700 ${
              !showLeftButton ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
            aria-label={`Scroll ${title} left`}
            disabled={!showLeftButton}
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            className={`rounded-full bg-gray-800/80 p-2 text-white transition-all hover:bg-gray-700 ${
              !showRightButton ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
            aria-label={`Scroll ${title} right`}
            disabled={!showRightButton}
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="relative">
        <div
          ref={rowRef}
          className="flex space-x-4 overflow-x-scroll scrollbar-hide px-4 pb-4 md:px-8 lg:px-12 scroll-smooth"
          role="list"
          aria-label={`${title} movies`}
          tabIndex={0}
        >
          {movies.map((movie) => (
            <div 
              key={movie.id} 
              className="w-40 flex-shrink-0 transition-transform hover:scale-105 md:w-48"
              role="listitem"
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}