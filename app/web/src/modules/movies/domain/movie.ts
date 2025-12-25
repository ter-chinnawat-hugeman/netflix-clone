interface ApiMovie {
id: number;
title: string;
overview: string;
poster_path: string | null;
backdrop_path: string | null;
release_date: string;
vote_average: number;
genre_ids: number[];
original_language: string;
original_title: string;
popularity: number;
video: boolean;
vote_count: number;
adult: boolean;
[key: string]: any;
}
interface ApiMovieDetail extends ApiMovie {
genres: Array<{
id: number;
name: string;
}>;
runtime?: number;
status?: string;
tagline?: string;
production_companies: Array<{
id: number;
name: string;
logo_path: string | null;
origin_country: string;
}>;
production_countries: Array<{
iso_3166_1: string;
name: string;
}>;
spoken_languages: Array<{
english_name: string;
iso_639_1: string;
name: string;
}>;
budget: number;
revenue: number;
imdb_id: string | null;
homepage: string | null;
videos?: {
results: Array<{
id: string;
key: string;
name: string;
site: string;
size: number;
type: string;
official: boolean;
published_at: string;
}>;
};
credits?: {
cast: Array<{
id: number;
name: string;
character: string;
profile_path: string | null;
}>;
crew: Array<{
id: number;
name: string;
job: string;
department: string;
profile_path: string | null;
}>;
};
}
interface ApiMovieListResponse {
page: number;
results: ApiMovie[];
total_pages: number;
total_results: number;
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
voteCount: number;
adult: boolean;
}
export interface MovieDetail extends Movie {
genres: Array<{
id: number;
name: string;
}>;
runtime?: number;
status?: string;
tagline?: string;
productionCompanies: Array<{
id: number;
name: string;
logoPath: string | null;
originCountry: string;
}>;
productionCountries: Array<{
iso31661: string;
name: string;
}>;
spokenLanguages: Array<{
englishName: string;
iso6391: string;
name: string;
}>;
budget: number;
revenue: number;
imdbId: string | null;
homepage: string | null;
videos?: {
results: Array<{
id: string;
key: string;
name: string;
site: string;
size: number;
type: string;
official: boolean;
publishedAt: string;
}>;
};
credits?: {
cast: Array<{
id: number;
name: string;
character: string;
profilePath: string | null;
}>;
crew: Array<{
id: number;
name: string;
job: string;
department: string;
profilePath: string | null;
}>;
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
return obj.map(v => toCamelCase(v));
}
return Object.keys(obj).reduce((result, key) => {
const value = obj[key];
const camelKey = key.replace(/([-_][a-z])/g, group =>
group.toUpperCase().replace('-', '').replace('_', '')
);
return {
...result,
[camelKey]: toCamelCase(value)
};
}, {});
}
export function mapApiMovie(apiMovie: ApiMovie): Movie {
return toCamelCase(apiMovie);
}
export function mapApiMovieDetail(apiMovie: ApiMovieDetail): MovieDetail {
return toCamelCase(apiMovie);
}
export function mapApiMovieListResponse(apiResponse: ApiMovieListResponse): MovieListResponse {
return {
page: apiResponse.page,
results: apiResponse.results.map(mapApiMovie),
totalPages: apiResponse.total_pages,
totalResults: apiResponse.total_results
};
}