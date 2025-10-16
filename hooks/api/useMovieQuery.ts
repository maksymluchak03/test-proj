import {
  addOrRemoveFavorite,
  getFavorites,
  getMovieCredits,
  getMovieGenres,
  getMovies,
  getSearchMovies,
} from "@/services/moviesService";
import { useFavoritesStore } from "@/stores/favoritesStore";
import { useMovieStore } from "@/stores/movieStore";
import { MovieSort, SortOrder } from "@/types/api/movie";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useMovies = ({
  query,
  page = 1,
  sort_by,
  sortOrder,
  genre,
  language,
  session_id,
}: {
  query?: string;
  page?: number;
  sort_by?: MovieSort;
  sortOrder?: SortOrder;
  genre?: string[];
  language?: string;
  session_id?: string;
}) => {
  const isSearch = !!query?.trim();

  return useQuery({
    queryKey: isSearch
      ? ["movies", "search", query, page, language]
      : [
          "movies",
          page,
          sort_by,
          sortOrder,
          genre ? genre.join(",") : undefined,
          language,
        ],
    queryFn: () =>
      isSearch
        ? getSearchMovies(query ?? "", page, language)
        : getMovies(
            language,
            page,
            session_id,
            sort_by,
            genre ? genre.join(",") : undefined
          ),
    enabled: !isSearch || (query?.trim().length ?? 0) > 0,
  });
};

export const useMovieGenreQuery = () => {
  const { genres, setGenres } = useMovieStore();

  return useQuery({
    queryKey: ["movieGenres"],
    queryFn: async () => {
      const data = await getMovieGenres();
      setGenres(data.genres);
      return data;
    },
    staleTime: 1000 * 60 * 60 * 24,
    enabled: genres.length === 0,
  });
};

export const useMovieCreditsQuery = (movieId: number) => {
  return useQuery({
    queryKey: ["movieCredits", movieId],
    queryFn: () => getMovieCredits(movieId),
  });
};

export const useFavoritesQuery = ({
  language,
  page,
  session_id,
  sort_by,
}: {
  language?: string;
  page?: number;
  session_id?: string;
  sort_by?: "created_at.asc" | "created_at.desc";
}) => {
  return useQuery({
    queryKey: ["favorites", page, sort_by],
    queryFn: () => getFavorites({ language, page, session_id, sort_by }),
  });
};

export const useFavoriteMovie = ({
  media_id,
  media_type,
}: {
  media_id: number;
  media_type: "movie" | "tv";
}) => {
  const queryClient = useQueryClient();
  const { addFavorite, removeFavorite } = useFavoritesStore();

  const isMovieFavorite = useFavoritesStore((state) =>
    state.favorites.includes(media_id)
  );

  const mutation = useMutation({
    mutationFn: () =>
      addOrRemoveFavorite(media_type, media_id, !isMovieFavorite),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["favorites"] });
      if (isMovieFavorite) {
        removeFavorite(media_id);
      } else {
        addFavorite(media_id);
      }
    },
    onError: (error) => {
      console.error("Error toggling favorite:", error);
    },
  });

  return {
    isFavorite: isMovieFavorite,
    toggleFavorite: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  };
};
