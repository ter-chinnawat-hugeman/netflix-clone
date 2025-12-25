export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
export const API_ENDPOINTS = {
MOVIES: {
TRENDING: '/movies/trending',
DETAIL: (id: string | number) => `/movies/${id}`,
SEARCH: '/movies/search',
},
};