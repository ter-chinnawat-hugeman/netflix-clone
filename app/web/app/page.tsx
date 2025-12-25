import Image from "next/image";
import { getTrendingMovies } from './lib/movies/getTrendingMovies';
import { MovieRow } from './components/MovieRow';
import { Metadata } from 'next';
import { Movie, MovieListResponse } from '../src/modules/movies/domain/movie';
export const metadata: Metadata = {
title: 'Netflix Clone - Watch TV Shows Online, Watch Movies Online',
description: 'Watch Netflix movies & TV shows online or stream right to your smart TV, game console, PC, Mac, mobile, tablet and more.',
};
function PlaceholderRow({ title }: { title: string }) {
return (
<div className="mb-8 md:mb-12">
<h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 px-4 md:px-8 lg:px-12 text-white">{title}</h2>
<div className="relative">
<div className="flex space-x-2 md:space-x-4 overflow-x-scroll scrollbar-hide px-4 md:px-8 lg:px-12 pb-2">
{[...Array(6)].map((_, i) => (
<div
key={i}
className="flex-none w-32 h-48 md:w-48 md:h-64 lg:w-56 lg:h-80 bg-gray-800/80 rounded-md md:rounded-lg animate-pulse transition-all duration-300 hover:scale-105 hover:opacity-90"
></div>
))}
</div>
</div>
</div>
);
}
export default async function Home() {
let trendingMovies: MovieListResponse = {
page: 1,
results: [],
totalPages: 0,
  totalResults: 0
};

let popularMovies: Movie[] = [];
let topRatedMovies: Movie[] = [];
let featuredMovie: Movie | null = null;
let featuredBackdrop = '/no-backdrop.jpg';

try {
  trendingMovies = await getTrendingMovies();
  
  if (trendingMovies.results.length > 0) {
    popularMovies = [...trendingMovies.results].sort((a, b) => b.popularity - a.popularity);
    topRatedMovies = [...trendingMovies.results].sort((a, b) => b.voteAverage - a.voteAverage);
    
    // Get a random movie for the hero section
    featuredMovie = trendingMovies.results[Math.floor(Math.random() * trendingMovies.results.length)];
    
    if (featuredMovie?.backdropPath) {
      featuredBackdrop = `https://image.tmdb.org/t/p/original${featuredMovie.backdropPath}`;
    }
  }
} catch (error) {
console.error('Error in Home component:', error);
}
const hasData = trendingMovies.results.length > 0;
return (
<main className="min-h-screen bg-gray-900">
{}
<section className="relative h-[60vh] md:h-screen">
<div className="absolute inset-0">
{hasData && featuredMovie ? (
<>
<div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-gray-900/90 via-gray-900/30 to-transparent z-10" />
<img
src={featuredBackdrop}
alt={featuredMovie.title}
className="w-full h-full object-cover object-top"
loading="eager"
/>
<div className="absolute bottom-0 left-0 right-0 h-1/2 md:h-2/3 bg-gradient-to-t from-gray-900 to-transparent z-10" />
</>
) : (
<div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
<div className="text-center px-4">
<h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Netflix Clone</h1>
<p className="text-xl text-gray-300">Loading content...</p>
</div>
</div>
)}
</div>
<div className="relative z-20 h-full flex items-end pb-16 md:items-center md:pb-0 px-4 md:px-8 lg:px-12">
{featuredMovie && (
<div className="max-w-2xl lg:max-w-3xl">
<h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 leading-tight">
{featuredMovie.title}
</h1>
<p className="text-gray-200 text-base md:text-lg lg:text-xl mb-4 md:mb-6 line-clamp-2 md:line-clamp-3">
{featuredMovie.overview}
</p>
<div className="flex space-x-3 mt-4">
<button className="bg-white text-black hover:bg-opacity-80 px-4 py-2 md:px-6 md:py-2.5 rounded font-medium text-sm md:text-base flex items-center">
<svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
<path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" fillRule="evenodd"></path>
</svg>
Play
</button>
<button className="bg-gray-600/70 text-white hover:bg-opacity-50 px-4 py-2 md:px-6 md:py-2.5 rounded font-medium text-sm md:text-base flex items-center">
<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
</svg>
More Info
</button>
</div>
</div>
)}
</div>
</section>
{}
<div className="relative md:-mt-16 lg:-mt-24 space-y-8 md:space-y-10 pb-16">
{hasData ? (
<>
<MovieRow title="Trending Now" movies={trendingMovies?.results || []} />
<MovieRow title="Popular on Netflix" movies={popularMovies} />
<MovieRow title="Top Rated" movies={topRatedMovies} />
</>
) : (
<>
<PlaceholderRow title="Trending Now" />
<PlaceholderRow title="Popular on Netflix" />
<PlaceholderRow title="Top Rated" />
</>
)}
</div>
</main>
);
}