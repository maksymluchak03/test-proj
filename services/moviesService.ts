import { ENDPOINTS } from "@/constants/endpoints";
import {
  EditFavoriteResponse,
  MovieCreditsResponse,
  MovieGenresResponse,
  MovieSort,
  MoviesResponse,
} from "@/types/api/movie";
import axiosInstance from "./axiosInstance";

export const getMovies = async (
  language?: string,
  page?: number,
  session_id?: string,
  sort_by?: MovieSort,
  with_genres?: string
): Promise<MoviesResponse> => {
  try {
    const { data } = await axiosInstance.get(ENDPOINTS.MOVIES.MOVIES, {
      params: {
        language,
        page,
        sort_by,
        session_id,
        with_genres,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSearchMovies = async (
  query: string,
  page?: number,
  language?: string
): Promise<MoviesResponse> => {
  try {
    const { data } = await axiosInstance.get(ENDPOINTS.MOVIES.SEARCH_MOVIE, {
      params: {
        query,
        page,
        language,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMovieGenres = async (): Promise<MovieGenresResponse> => {
  try {
    const { data } = await axiosInstance.get(ENDPOINTS.MOVIES.GENRES);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMovieCredits = async (
  movieId: number
): Promise<MovieCreditsResponse> => {
  try {
    const { data } = await axiosInstance.get(
      ENDPOINTS.MOVIES.CREDITS.replace("{movie_id}", movieId.toString())
    );
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getFavorites = async ({
  language,
  page = 1,
  session_id,
  sort_by,
}: {
  language?: string;
  page?: number;
  session_id?: string;
  sort_by?: "created_at.asc" | "created_at.desc";
}): Promise<MoviesResponse> => {
  try {
    const { data } = await axiosInstance.get(
      ENDPOINTS.MOVIES.FAVORITES_MOVIES.replace("{account_id}", "22291878"),
      {
        params: {
          language,
          page,
          sort_by,
          session_id,
        },
      }
    );
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addOrRemoveFavorite = async (
  media_type: "movie" | "tv",
  media_id: number,
  favorite: boolean
): Promise<EditFavoriteResponse> => {
  try {
    const { data } = await axiosInstance.post(
      ENDPOINTS.MOVIES.FAVORITES_ADD.replace("{account_id}", "22291878"),
      {
        media_type,
        media_id,
        favorite,
      }
    );
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
