export interface ActionTest {
  type: string;
}

export interface Film {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Filters {
  sortedByPopularity: string;
  sortedByYear: string;
}

export enum FilterPopularity {
  PopularityAscending = 'PopularityAscending',
  PopularityDescending = 'PopularityDescending',
  RateAscending = 'RateAscending',
  RateDescending = 'RateDescending',
}
