import { type MovieDetail, mapApiMovieDetail } from '../../types/movie';
export type { MovieDetail };
export async function getMovieDetail(id: string): Promise<MovieDetail> {
  if (!id) {
    throw new Error('No movie ID provided');
  }

  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8008'}/movies/${id}?append_to_response=credits`;
    console.log('🔄 Fetching movie details:', { id, apiUrl });
    
    const response = await fetch(apiUrl, {
      next: { revalidate: 60 * 60 * 24 }, // Revalidate once per day
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { message: 'Failed to parse error response' };
      }
      
      console.error('❌ API Error:', {
        url: apiUrl,
        status: response.status,
        statusText: response.statusText,
        error: errorData,
        headers: Object.fromEntries(response.headers.entries())
      });

      if (response.status === 404) {
        throw new Error(`Movie with ID ${id} not found`);
}
throw new Error(`Failed to fetch movie: ${response.status} ${response.statusText}`);
}
const data = await response.json();
if (!data) {
console.error('❌ Empty response data for movie ID:', id);
throw new Error(`No data returned for movie with id ${id}`);
}
console.log('✅ Movie data received:', {
id: data.id,
title: data.title,
hasPoster: !!data.poster_path,
hasBackdrop: !!data.backdrop_path,
hasCredits: !!data.credits?.cast?.length
});
const movie = mapApiMovieDetail(data);
return movie;
} catch (error) {
console.error(`❌ Error in getMovieDetail for ID ${id}:`, error);
if (error instanceof Error) {
console.error('Error details:', {
name: error.name,
message: error.message,
stack: error.stack?.split('\n').slice(0, 3).join('\n')
});
}
throw new Error(`Failed to load movie details: ${error instanceof Error ? error.message : 'Unknown error'}`);
}
}