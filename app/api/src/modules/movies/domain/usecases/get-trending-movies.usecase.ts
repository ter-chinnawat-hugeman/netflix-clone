import { Inject, Injectable } from '@nestjs/common';
import type { MovieRepository } from '../repositories/movie.repository';
import { MovieEntity } from '../entities/movie.entity';
@Injectable()
export class GetTrendingMoviesUseCase {
constructor(
@Inject('MovieRepository')
private readonly movieRepository: MovieRepository
) {}
async execute(): Promise<MovieEntity[]> {
return this.movieRepository.findTrending();
}
}