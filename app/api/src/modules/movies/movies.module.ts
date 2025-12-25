import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import { MoviesController } from './presentation/movies.controller';
import { TmdbService } from './infrastructure/tmdb/tmdb.service';
import { TmdbMovieRepository } from './infrastructure/repositories/tmdb-movie.repository';
import { MovieRepository } from './domain/repositories/movie.repository';
import { GetTrendingMoviesUseCase } from './domain/usecases/get-trending-movies.usecase';
import { GetMovieDetailUseCase } from './domain/usecases/get-movie-detail.usecase';
@Module({
imports: [
HttpModule.registerAsync({
imports: [ConfigModule],
useFactory: async (configService: ConfigService) => ({
timeout: 5000,
maxRedirects: 5,
}),
inject: [ConfigService],
}),
CacheModule.register({
ttl: 60 * 60,
max: 100,
isGlobal: true,
}),
],
controllers: [MoviesController],
providers: [
TmdbService,
{
provide: 'MovieRepository',
useClass: TmdbMovieRepository,
},
GetTrendingMoviesUseCase,
GetMovieDetailUseCase,
],
exports: [],
})
export class MoviesModule {}