import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '../modules/movies/domain/movie';

interface MovieCardProps {
  movie: Movie;
  width?: number;
  height?: number;
}

export function MovieCard({ movie, width = 300, height = 450 }: MovieCardProps) {
  const imageUrl = movie.posterPath
    ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
    : '/no-poster.jpg';

  return (
    <Link 
      href={`/movie/${movie.id}`} 
      className="group relative block"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-md bg-gray-800">
        <Image
          src={imageUrl}
          alt={movie.title}
          width={width}
          height={height}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-60" />
      </div>
      <div className="mt-2">
        <h3 className="text-sm font-medium text-white line-clamp-1">
          {movie.title}
        </h3>
        <div className="mt-1 flex items-center text-xs text-gray-400">
          <span>
            {movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : 'N/A'}
          </span>
<span className="mx-1">•</span>
<span>{movie.voteAverage ? movie.voteAverage.toFixed(1) : 'N/A'}/10</span>
</div>
</div>
</Link>
);
}