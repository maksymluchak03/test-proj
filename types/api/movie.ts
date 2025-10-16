export interface Movie {
    adult: boolean;
    backdrop_path: string;
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
  
  export interface MoviesResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  }
  
  export interface Genre {
    id: number;
    name: string;
  }
  
  export interface MovieGenresResponse {
    genres: Genre[];
  }
  
  export interface Cast {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
  }
  
  export interface Crew {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    credit_id: string;
    department: string;
    job: string;
  }
  
  export interface MovieCreditsResponse {
    id: number;
    cast: Cast[];
    crew: Crew[];
  }
  
  export interface EditFavoriteResponse {
    success: boolean;
    status_code: number;
    status_message: string;
  }
  
  export type MovieSortField =
    | "original_title"
    | "title"
    | "popularity"
    | "primary_release_date"
    | "revenue"
    | "vote_average"
    | "vote_count";
  
  export type SortOrder = "asc" | "desc";
  
  export type MovieSort = `${MovieSortField}.${SortOrder}` | undefined;
  