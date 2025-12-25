import { MovieListResponse, mapApiMovieListResponse } from '../../types/movie';

/**
 * Fetches the trending movies from the API.
 * 
 * @returns A promise that resolves to a MovieListResponse object.
 */
export async function getTrendingMovies(): Promise<MovieListResponse> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
    
    const response = await fetch(`${apiUrl}/movies/trending`, {
      next: { revalidate: 60 * 60 * 24 }
    });
    
    if (!response.ok) {
      console.error(`Failed to fetch trending movies: ${response.statusText}`);
      return getDefaultMovieListResponse();
    }
    
    const data = await response.json();
    
    console.log(data);
    
    return mapApiMovieListResponse({
      page: data.page || 1,
      results: data.results || [],
      total_pages: data.total_pages || 0,
      total_results: data.total_results || 0
    });
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    
    return getDefaultMovieListResponse();
  }
}

/**
 * Returns a default MovieListResponse object.
 * 
 * @returns A MovieListResponse object with default values.
 */
function getDefaultMovieListResponse(): MovieListResponse {
  return {
    page: 1,
    results: [],
    totalPages: 0,
    totalResults: 0
  };
}