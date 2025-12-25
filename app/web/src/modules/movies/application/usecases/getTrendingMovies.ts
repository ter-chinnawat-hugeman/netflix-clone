import { MovieListResponse } from '../../domain/movie';
import { movieApi } from '../../infrastructure/movie.api';
export async function getTrendingMovies(): Promise<MovieListResponse> {
try {
const data = await movieApi.getTrending();
return data;
} catch (error) {
console.error('Error fetching trending movies:', error);
throw error;
}
}