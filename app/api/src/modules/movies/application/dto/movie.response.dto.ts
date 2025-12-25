import { ApiProperty } from '@nestjs/swagger';
import { Movie as SharedMovie } from '../../../../../../../packages/shared';
class MovieDto implements SharedMovie {
@ApiProperty({ description: 'The unique identifier of the movie' })
id: number;
@ApiProperty({ description: 'The title of the movie' })
title: string;
@ApiProperty({ description: 'The overview of the movie' })
overview: string;
@ApiProperty({ description: 'The poster path of the movie', nullable: true })
posterPath: string | null;
@ApiProperty({ description: 'The backdrop path of the movie', nullable: true })
backdropPath: string | null;
@ApiProperty({ description: 'The release date of the movie' })
releaseDate: string;
@ApiProperty({ description: 'The average vote of the movie' })
voteAverage: number;
@ApiProperty({
description: 'The genre IDs of the movie',
isArray: true,
type: Number
})
genreIds: number[];
@ApiProperty({ description: 'The original language of the movie' })
originalLanguage: string;
@ApiProperty({ description: 'The original title of the movie' })
originalTitle: string;
@ApiProperty({ description: 'The popularity score of the movie' })
popularity: number;
@ApiProperty({ description: 'Whether the movie has a video' })
video: boolean;
@ApiProperty({ description: 'The number of votes for the movie' })
voteCount: number;
@ApiProperty({ description: 'Whether the movie is for adults only' })
adult: boolean;
}
export { MovieDto };
export class MovieResponseDto extends MovieDto {}
export class MovieDetailResponseDto extends MovieDto {
@ApiProperty({
description: 'The runtime of the movie in minutes',
required: false
})
runtime?: number;
@ApiProperty({
description: 'The movie status (e.g., "Released")',
required: false
})
status?: string;
@ApiProperty({
description: 'The movie tagline',
required: false
})
tagline?: string;
@ApiProperty({
description: 'Production companies',
type: 'array',
items: {
type: 'object',
properties: {
id: { type: 'number' },
name: { type: 'string' }
}
},
required: false
})
productionCompanies?: Array<{
id: number;
name: string;
}>;
}
export class MovieListResponseDto {
@ApiProperty({ description: 'The current page number', example: 1 })
page: number;
@ApiProperty({
description: 'List of movies',
type: [MovieDto],
isArray: true
})
results: MovieDto[];
@ApiProperty({
description: 'Total number of pages',
example: 100,
name: 'totalPages'
})
totalPages: number;
@ApiProperty({
description: 'Total number of results',
example: 2000,
name: 'totalResults'
})
totalResults: number;
}