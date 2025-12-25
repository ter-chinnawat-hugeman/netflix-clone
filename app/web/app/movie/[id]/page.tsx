import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Suspense } from 'react';
import { getMovieDetail } from '../../lib/movies/getMovieDetail';
import type { MovieDetail } from '../../types/movie';

const getImageUrl = (path: string | null | undefined, size: 'w500' | 'original' = 'w500') => {
  if (!path) return null;
  if (path.startsWith('http')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `https://image.tmdb.org/t/p/${size}/${cleanPath}`;
};

const fallbackSvg = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MDAgNzUwIj48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9Ijc1MCIgZmlsbD0iIzFmMjkzNyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk5vIEluZm9ybWF0aW9uIEF2YWlsYWJsZTwvdGV4dD48L3N2Zz4=';
export async function generateStaticParams() {
return [];
}
export const revalidate = 0;
interface PageProps {
params: { id: string };
searchParams: { [key: string]: string | string[] | undefined };
}
export default async function MoviePage({ params, searchParams }: PageProps) {
  const movieId = params?.id;
  
  if (!movieId) {
    console.error('No movie ID provided in URL');
    notFound();
  }

  let movie: MovieDetail;
  
  try {
    movie = await getMovieDetail(String(movieId));
    if (!movie) {
      console.error(`Movie with ID ${movieId} not found`);
      notFound();
    }
  } catch (error) {
    console.error('Error fetching movie details:', error);
    notFound();
  }

  const getBackdropUrl = () => {
    const url = movie.backdropPath ? getImageUrl(movie.backdropPath, 'original') : null;
    return url || fallbackSvg;
  };

  const getPosterUrl = () => {
    const url = movie.posterPath ? getImageUrl(movie.posterPath) : null;
    return url || fallbackSvg;
  };

  const backdropUrl = getBackdropUrl();
  const posterUrl = getPosterUrl();
  const releaseYear = new Date(movie.releaseDate).getFullYear();
  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : '';

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Backdrop Image */}
      <div className="relative h-[50vh] w-full bg-gray-900">
        <Suspense fallback={<div className="absolute inset-0 bg-gray-800 animate-pulse" />}>
          <div className="relative w-full h-full">
            {/* Fallback backdrop */}
            <div
              className="w-full h-full absolute"
              style={{
                backgroundImage: `url("${fallbackSvg}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.3,
                display: backdropUrl === fallbackSvg ? 'block' : 'none'
              }}
            >
              <span className="sr-only">No backdrop available</span>
            </div>
            
            {/* Main backdrop image */}
            {backdropUrl !== fallbackSvg && (
              <Image
                src={backdropUrl}
                alt={`${movie.title} backdrop`}
                fill
                className="object-cover object-center opacity-30"
                priority
                onError={(e) => {
                  console.error('Error loading backdrop:', backdropUrl);
                  const container = e.currentTarget.parentElement;
                  if (container) {
                    const fallback = container.firstElementChild as HTMLElement;
                    if (fallback) {
                      e.currentTarget.style.display = 'none';
                      fallback.style.display = 'block';
                    }
                  }
                }}
              />
            )}
          </div>
        </Suspense>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
      </div>

      {/* Movie Content */}
      <div className="relative z-10 mx-auto -mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Movie Poster */}
          <div className="w-full max-w-xs flex-shrink-0">
            <div className="aspect-[2/3] overflow-hidden rounded-lg shadow-2xl bg-gray-800">
              <Suspense fallback={<div className="w-full h-full bg-gray-700 animate-pulse" />}>
                <div className="relative w-full h-full">
                  {/* Fallback poster */}
                  <div
                    className="w-full h-full absolute flex items-center justify-center bg-gray-800"
                    style={{
                      backgroundImage: `url("${fallbackSvg}")`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      display: posterUrl === fallbackSvg ? 'flex' : 'none'
                    }}
                  >
                    <span className="sr-only">No poster available</span>
                  </div>
                  
                  {/* Main poster image */}
                  {posterUrl !== fallbackSvg && (
                    <Image
                      src={posterUrl}
                      alt={`${movie.title} poster`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-opacity opacity-0 duration-300"
                      onLoadingComplete={(img) => {
                        img.classList.remove('opacity-0');
                      }}
                      priority
                      onError={(e) => {
                        console.error('Error loading poster:', posterUrl);
                        const container = e.currentTarget.parentElement;
                        if (container) {
                          const fallback = container.firstElementChild as HTMLElement;
                          if (fallback) {
                            e.currentTarget.style.display = 'none';
                            fallback.style.display = 'flex';
                          }
                        }
                      }}
                    />
                  )}
                </div>
              </Suspense>
            </div>
          </div>

          {/* Movie Details */}
          <div className="py-4 flex-1">
            <h1 className="text-4xl font-bold">
              {movie.title} <span className="font-normal text-gray-400">({releaseYear})</span>
            </h1>
            
            {/* Genres and Metadata */}
            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-300">
              {movie.genres?.map((genre) => (
                <span key={genre.id} className="rounded-full bg-gray-800 px-3 py-1">
                  {genre.name}
                </span>
              ))}
              {runtime && <span>• {runtime}</span>}
              <span>• {movie.voteAverage.toFixed(1)}/10</span>
            </div>

            {/* Overview */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold">Overview</h2>
              <p className="mt-2 text-gray-300">{movie.overview}</p>
            </div>

            {/* Tagline */}
            {movie.tagline && (
              <p className="mt-4 italic text-gray-400">"{movie.tagline}"</p>
            )}

            {/* Action Buttons */}
            <div className="mt-8 flex space-x-4">
              <button className="flex items-center justify-center rounded-md bg-red-600 px-6 py-3 font-medium text-white hover:bg-red-700">
                <span>Play Trailer</span>
              </button>
              <button className="flex items-center justify-center rounded-md bg-gray-700 px-6 py-3 font-medium text-white hover:bg-gray-600">
                <span>+ My List</span>
              </button>
            </div>

            {/* Cast */}
            {movie.credits?.cast && movie.credits.cast.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold">Cast</h3>
                <div className="mt-2 flex space-x-4 overflow-x-auto pb-4">
                  {movie.credits.cast.slice(0, 10).map((person) => (
                    <div key={person.id} className="flex-shrink-0 text-center">
                      <div className="h-20 w-20 overflow-hidden rounded-full bg-gray-800">
                        {person.profilePath ? (
                          <Image
                            src={`https://image.tmdb.org/t/p/w185${person.profilePath}`}
                            alt={person.name}
                            width={80}
                            height={80}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gray-700 text-gray-400">
                            <span className="text-xs">No Image</span>
                          </div>
                        )}
                      </div>
                      <p className="mt-2 text-sm font-medium">{person.name}</p>
                      <p className="text-xs text-gray-400">{person.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}