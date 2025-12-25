import { useRef, useState } from 'react';
import { Movie } from '../modules/movies/domain/movie';
import { MovieCard } from './MovieCard';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
interface MovieRowProps {
title: string;
movies: Movie[];
}
export function MovieRow({ title, movies }: MovieRowProps) {
const rowRef = useRef<HTMLDivElement>(null);
const [isScrolled, setIsScrolled] = useState(false);
const handleScroll = (direction: 'left' | 'right') => {
if (!rowRef.current) return;
const { scrollLeft, clientWidth } = rowRef.current;
const scrollTo = direction === 'left'
? scrollLeft - clientWidth
: scrollLeft + clientWidth;
rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
};
if (!movies?.length) return null;
return (
<div className="space-y-2">
<div className="flex items-center justify-between px-4 md:px-8 lg:px-12">
<h2 className="text-lg font-bold text-white md:text-xl">{title}</h2>
<div className="flex space-x-2">
<button
onClick={() => handleScroll('left')}
className="rounded-full bg-gray-800 p-2 text-white hover:bg-gray-700"
aria-label="Scroll left"
>
<ChevronLeftIcon className="h-5 w-5" />
</button>
<button
onClick={() => handleScroll('right')}
className="rounded-full bg-gray-800 p-2 text-white hover:bg-gray-700"
aria-label="Scroll right"
>
<ChevronRightIcon className="h-5 w-5" />
</button>
</div>
</div>
<div className="relative">
<div
ref={rowRef}
className="flex space-x-4 overflow-x-scroll scrollbar-hide px-4 pb-4 md:px-8 lg:px-12"
>
{movies.map((movie) => (
<div key={movie.id} className="w-40 flex-shrink-0 md:w-48">
<MovieCard movie={movie} />
</div>
))}
</div>
</div>
</div>
);
}