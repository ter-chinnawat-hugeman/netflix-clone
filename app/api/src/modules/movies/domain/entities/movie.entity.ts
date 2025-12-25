export interface IMovie {
id: number;
title: string;
overview: string;
posterPath: string | null;
backdropPath: string | null;
releaseDate: string;
voteAverage: number;
genreIds: number[];
originalLanguage: string;
originalTitle: string;
popularity: number;
video: boolean;
voteCount: number;
adult: boolean;
}
export class MovieEntity implements IMovie {
id: number;
title: string;
overview: string;
posterPath: string | null;
backdropPath: string | null;
releaseDate: string;
voteAverage: number;
genreIds: number[];
originalLanguage: string;
originalTitle: string;
popularity: number;
video: boolean;
voteCount: number;
adult: boolean;
constructor(movie: Partial<IMovie>) {
this.id = movie.id || 0;
this.title = movie.title || '';
this.overview = movie.overview || '';
this.posterPath = movie.posterPath || null;
this.backdropPath = movie.backdropPath || null;
this.releaseDate = movie.releaseDate || '';
this.voteAverage = movie.voteAverage || 0;
this.genreIds = movie.genreIds || [];
this.originalLanguage = movie.originalLanguage || '';
this.originalTitle = movie.originalTitle || '';
this.popularity = movie.popularity || 0;
this.video = movie.video || false;
this.voteCount = movie.voteCount || 0;
this.adult = movie.adult || false;
}
}