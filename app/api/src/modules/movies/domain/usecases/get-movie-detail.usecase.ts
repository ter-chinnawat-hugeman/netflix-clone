import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { MovieRepository } from '../repositories/movie.repository';
import { MovieEntity } from '../entities/movie.entity';
@Injectable()
export class GetMovieDetailUseCase {
constructor(
@Inject('MovieRepository')
private readonly movieRepository: MovieRepository
) {}
async execute(id: number): Promise<MovieEntity> {
const movie = await this.movieRepository.findById(id);
if (!movie) {
throw new NotFoundException(`Movie with ID ${id} not found`);
}
return movie;
}
}