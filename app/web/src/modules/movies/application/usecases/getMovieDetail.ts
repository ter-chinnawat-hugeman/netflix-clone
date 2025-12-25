import { MovieDetail } from '../../domain/movie';
import { movieApi } from '../../infrastructure/movie.api';
export async function getMovieDetail(id: string): Promise<MovieDetail> {
try {
const movie = await movieApi.getMovieDetail(Number(id));
return movie;
} catch (error) {
console.error(`Error fetching movie with id ${id}:`, error);
throw error;
}
}