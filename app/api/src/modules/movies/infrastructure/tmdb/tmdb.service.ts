import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { MovieEntity } from '../../domain/entities/movie.entity';
@Injectable()
export class TmdbService {
private readonly baseUrl = 'https://api.themoviedb.org/3';
private readonly apiKey: string;
private readonly logger = new Logger(TmdbService.name);
constructor(
private readonly httpService: HttpService,
private readonly configService: ConfigService,
) {
const apiKey = this.configService.get<string>('TMDB_API_KEY');
if (!apiKey) {
this.logger.error('TMDB_API_KEY is not set in environment variables');
throw new Error('TMDB_API_KEY is required');
}
this.apiKey = apiKey;
}
private getAuthHeaders() {
return {
'Authorization': `Bearer ${this.apiKey}`,
'Content-Type': 'application/json;charset=utf-8',
};
}
async getTrendingMovies(): Promise<MovieEntity[]> {
try {
const response = await firstValueFrom(
this.httpService.get<{ results: any[] }>(
`${this.baseUrl}/trending/movie/day`,
{
headers: this.getAuthHeaders(),
params: {
language: 'en-US',
include_image_language: 'en,null'
},
},
),
);
return (response.data?.results || []).map((movie) => new MovieEntity({
id: movie.id,
title: movie.title,
overview: movie.overview,
posterPath: movie.poster_path || null,
backdropPath: movie.backdrop_path || null,
releaseDate: movie.release_date,
voteAverage: movie.vote_average,
genreIds: movie.genre_ids || [],
originalLanguage: movie.original_language,
originalTitle: movie.original_title,
popularity: movie.popularity || 0,
video: movie.video || false,
voteCount: movie.vote_count || 0,
adult: movie.adult || false,
}));
} catch (error) {
this.logger.error('Error fetching trending movies', error);
throw new Error('Failed to fetch trending movies');
}
}
async getMovieById(id: number): Promise<MovieEntity | null> {
try {
const response = await firstValueFrom(
this.httpService.get<any>(
`${this.baseUrl}/movie/${id}`,
{
params: {
append_to_response: 'videos,credits,images',
language: 'en-US',
include_image_language: 'en,null'
},
headers: this.getAuthHeaders(),
},
),
);
if (!response.data) {
return null;
}
return new MovieEntity({
id: response.data.id,
title: response.data.title,
overview: response.data.overview,
posterPath: response.data.poster_path || null,
backdropPath: response.data.backdrop_path || null,
releaseDate: response.data.release_date,
voteAverage: response.data.vote_average,
genreIds: response.data.genres?.map((g: any) => g.id) || [],
originalLanguage: response.data.original_language,
originalTitle: response.data.original_title,
popularity: response.data.popularity || 0,
video: response.data.video || false,
voteCount: response.data.vote_count || 0,
adult: response.data.adult || false,
});
} catch (error) {
if (error.response?.status === 404) {
return null;
}
this.logger.error(`Error fetching movie with id ${id}`, error);
throw new Error(`Failed to fetch movie with id ${id}`);
}
}
async searchMovies(query: string): Promise<MovieEntity[]> {
try {
const response = await firstValueFrom(
this.httpService.get<{ results: any[] }>(
`${this.baseUrl}/search/movie`,
{
params: {
query,
language: 'en-US',
include_adult: false,
},
headers: this.getAuthHeaders(),
},
),
);
return (response.data?.results || []).map((movie) => new MovieEntity({
...movie,
posterPath: movie.poster_path || null,
backdropPath: movie.backdrop_path || null,
releaseDate: movie.release_date,
voteAverage: movie.vote_average,
genreIds: movie.genre_ids || [],
originalLanguage: movie.original_language,
originalTitle: movie.original_title,
voteCount: movie.vote_count,
}));
} catch (error) {
this.logger.error(`Error searching movies with query: ${query}`, error);
throw new Error('Failed to search movies');
}
}
}