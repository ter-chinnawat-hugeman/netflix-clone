import { MovieEntity } from '../entities/movie.entity';
export interface MovieRepository {
findTrending(): Promise<MovieEntity[]>;
findById(id: number): Promise<MovieEntity | null>;
search(query: string): Promise<MovieEntity[]>;
}