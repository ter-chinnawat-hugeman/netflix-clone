import { Injectable } from '@nestjs/common';
import { MovieRepository } from '../../domain/repositories/movie.repository';
import { MovieEntity } from '../../domain/entities/movie.entity';
import { TmdbService } from '../tmdb/tmdb.service';
@Injectable()
export class TmdbMovieRepository implements MovieRepository {
constructor(private readonly tmdbService: TmdbService) {}
async findTrending(): Promise<MovieEntity[]> {
return this.tmdbService.getTrendingMovies();
}
async findById(id: number): Promise<MovieEntity | null> {
return this.tmdbService.getMovieById(id);
}
async search(query: string): Promise<MovieEntity[]> {
return this.tmdbService.searchMovies(query);
}
}