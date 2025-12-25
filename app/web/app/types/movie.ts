interface ApiMovie {
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
adult: boolean;
voteCount: number;
[key: string]: any;
}
interface ApiGenre {
id: number;
name: string;
}
interface ApiProductionCompany {
id: number;
name: string;
logo_path: string | null;
origin_country: string;
}
interface ApiProductionCountry {
iso_3166_1: string;
name: string;
}
interface ApiSpokenLanguage {
english_name: string;
iso_639_1: string;
name: string;
}
interface ApiMovieDetail extends ApiMovie {
belongs_to_collection: null | {
id: number;
name: string;
poster_path: string | null;
backdrop_path: string | null;
};
budget: number;
genres: ApiGenre[];
homepage: string;
imdb_id: string | null;
production_companies: ApiProductionCompany[];
production_countries: ApiProductionCountry[];
release_date: string;
revenue: number;
runtime: number | null;
spoken_languages: ApiSpokenLanguage[];
status: string;
tagline: string | null;
title: string;
video: boolean;
vote_average: number;
vote_count: number;
}
interface ApiMovieListResponse {
page: number;
results: ApiMovie[];
total_pages: number;
total_results: number;
}
interface Genre {
id: number;
name: string;
}
interface ProductionCompany {
id: number;
name: string;
logoPath: string | null;
originCountry: string;
}
interface ProductionCountry {
iso31661: string;
name: string;
}
interface SpokenLanguage {
englishName: string;
iso6391: string;
name: string;
}
export interface Movie {
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
adult: boolean;
voteCount: number;
}
interface CastMember {
id: number;
name: string;
character: string;
profilePath: string | null;
}
export interface MovieDetail extends Omit<Movie, 'genreIds'> {
belongsToCollection: {
id: number;
name: string;
posterPath: string | null;
backdropPath: string | null;
} | null;
budget: number;
genres: Genre[];
homepage: string;
imdbId: string | null;
productionCompanies: ProductionCompany[];
productionCountries: ProductionCountry[];
releaseDate: string;
revenue: number;
runtime: number | null;
spokenLanguages: SpokenLanguage[];
status: string;
tagline: string | null;
title: string;
video: boolean;
voteAverage: number;
voteCount: number;
credits?: {
cast: CastMember[];
};
}
export interface MovieListResponse {
page: number;
results: Movie[];
totalPages: number;
totalResults: number;
}
function toCamelCase(obj: any): any {
if (obj === null || typeof obj !== 'object') {
return obj;
}
if (Array.isArray(obj)) {
return obj.map(item => toCamelCase(item));
}
return Object.entries(obj).reduce((result, [key, value]) => {
const camelKey = key.replace(/([-_][a-z])/g, group =>
group.toUpperCase().replace(/[-_]/g, '')
);
return {
...result,
[camelKey]: toCamelCase(value)
};
}, {});
}
export function mapApiMovie(apiMovie: ApiMovie): Movie {
if (!apiMovie) return null as any;
return {
id: apiMovie.id,
title: apiMovie.title,
overview: apiMovie.overview,
posterPath: apiMovie.posterPath,
backdropPath: apiMovie.backdropPath,
releaseDate: apiMovie.releaseDate,
voteAverage: apiMovie.voteAverage,
genreIds: apiMovie.genreIds || [],
originalLanguage: apiMovie.originalLanguage,
originalTitle: apiMovie.originalTitle,
popularity: apiMovie.popularity,
video: apiMovie.video,
adult: apiMovie.adult,
voteCount: apiMovie.voteCount
};
}
export function mapApiMovieDetail(apiMovie: ApiMovieDetail): MovieDetail {
if (!apiMovie) return null as any;
return {
id: apiMovie.id,
title: apiMovie.title,
overview: apiMovie.overview,
posterPath: apiMovie.posterPath,
backdropPath: apiMovie.backdropPath,
releaseDate: apiMovie.releaseDate,
voteAverage: apiMovie.voteAverage,
originalLanguage: apiMovie.originalLanguage,
originalTitle: apiMovie.originalTitle,
popularity: apiMovie.popularity,
video: apiMovie.video,
adult: apiMovie.adult,
voteCount: apiMovie.voteCount,
belongsToCollection: apiMovie.belongs_to_collection ? {
id: apiMovie.belongs_to_collection.id,
name: apiMovie.belongs_to_collection.name,
posterPath: apiMovie.belongs_to_collection.poster_path,
backdropPath: apiMovie.belongs_to_collection.backdrop_path
} : null,
budget: apiMovie.budget,
genres: (apiMovie.genres || []).map(genre => ({
id: genre.id,
name: genre.name
})),
homepage: apiMovie.homepage,
imdbId: apiMovie.imdb_id,
productionCompanies: (apiMovie.production_companies || []).map(company => ({
id: company.id,
name: company.name,
logoPath: company.logo_path,
originCountry: company.origin_country
})),
productionCountries: (apiMovie.production_countries || []).map(country => ({
iso31661: country.iso_3166_1,
name: country.name
})),
revenue: apiMovie.revenue,
runtime: apiMovie.runtime,
spokenLanguages: (apiMovie.spoken_languages || []).map(lang => ({
englishName: lang.english_name,
iso6391: lang.iso_639_1,
name: lang.name
})),
status: apiMovie.status,
tagline: apiMovie.tagline,
credits: apiMovie.credits ? {
cast: (apiMovie.credits.cast || []).map((cast: any) => ({
id: cast.id,
name: cast.name,
character: cast.character,
profilePath: cast.profile_path
}))
} : undefined
};
}
export function mapApiMovieListResponse(apiResponse: ApiMovieListResponse): MovieListResponse {
return {
page: apiResponse.page,
results: apiResponse.results.map(mapApiMovie),
totalPages: apiResponse.total_pages,
totalResults: apiResponse.total_results
};
}