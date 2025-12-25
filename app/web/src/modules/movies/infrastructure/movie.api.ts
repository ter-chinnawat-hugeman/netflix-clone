import {
Movie,
MovieDetail,
MovieListResponse,
mapApiMovie,
mapApiMovieDetail,
mapApiMovieListResponse
} from '../domain/movie';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
async function fetchFromApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
const response = await fetch(`${API_BASE_URL}${endpoint}`, {
...options,
headers: {
'Content-Type': 'application/json',
...options?.headers,
},
});
if (!response.ok) {
const error = await response.json();
throw new Error(error.message || 'Something went wrong');
}
return response.json();
}
export const movieApi = {
async getTrending(): Promise<MovieListResponse> {
const data = await fetchFromApi<any>('/movies/trending');
return mapApiMovieListResponse(data);
},
async getMovieDetail(id: number): Promise<MovieDetail> {
const data = await fetchFromApi<any>(`/movies/${id}`);
return mapApiMovieDetail(data);
},
async searchMovies(query: string): Promise<MovieListResponse> {
const data = await fetchFromApi<any>(`/movies/search?query=${encodeURIComponent(query)}`);
return mapApiMovieListResponse(data);
},
};