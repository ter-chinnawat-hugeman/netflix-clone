import { Movie } from '../movie.interface';
export interface MovieListResponse {
page: number;
results: Movie[];
total_pages: number;
total_results: number;
}
export interface MovieDetailResponse extends Movie {
genres: Array<{
id: number;
name: string;
}>;
runtime: number;
status: string;
tagline: string;
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