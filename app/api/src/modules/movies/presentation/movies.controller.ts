import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetTrendingMoviesUseCase } from '../domain/usecases/get-trending-movies.usecase';
import { GetMovieDetailUseCase } from '../domain/usecases/get-movie-detail.usecase';
import { MovieListResponseDto, MovieDetailResponseDto } from '../application/dto/movie.response.dto';
@ApiTags('movies')
@Controller('movies')
@UseInterceptors(CacheInterceptor)
export class MoviesController {
constructor(
private readonly getTrendingMoviesUseCase: GetTrendingMoviesUseCase,
private readonly getMovieDetailUseCase: GetMovieDetailUseCase,
) {}
@Get('trending')
@ApiOperation({ summary: 'Get trending movies' })
@ApiResponse({
status: 200,
description: 'Returns a list of trending movies',
type: MovieListResponseDto,
})
async getTrending(): Promise<MovieListResponseDto> {
try {
const movies = await this.getTrendingMoviesUseCase.execute();
const movieDtos = movies.map(movie => ({
id: movie.id,
title: movie.title,
overview: movie.overview,
posterPath: movie.posterPath,
backdropPath: movie.backdropPath,
releaseDate: movie.releaseDate,
voteAverage: movie.voteAverage,
genreIds: movie.genreIds,
originalLanguage: movie.originalLanguage,
originalTitle: movie.originalTitle,
popularity: movie.popularity,
video: movie.video,
voteCount: movie.voteCount,
adult: movie.adult
}));
return {
page: 1,
results: movieDtos,
totalPages: Math.ceil(movieDtos.length / 20),
totalResults: movieDtos.length,
};
} catch (error) {
console.error('Error in getTrending:', error);
return {
page: 1,
results: [],
totalPages: 0,
totalResults: 0,
};
}
}
@Get(':id')
@ApiOperation({ summary: 'Get movie details by ID' })
@ApiResponse({
status: 200,
description: 'Returns the movie details',
type: MovieDetailResponseDto,
})
@ApiResponse({ status: 404, description: 'Movie not found' })
async getMovieDetail(@Param('id') id: string): Promise<MovieDetailResponseDto> {
try {
const movie = await this.getMovieDetailUseCase.execute(parseInt(id, 10));
if (!movie) {
throw new Error('Movie not found');
}
return movie as unknown as MovieDetailResponseDto;
} catch (error) {
console.error(`Error getting movie details for ID ${id}:`, error);
throw error;
}
}
}