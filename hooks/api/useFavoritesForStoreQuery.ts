import { getFavorites } from "@/services/moviesService";
import { useFavoritesStore } from "@/stores/favoritesStore";
import { useQuery } from "@tanstack/react-query";

export const useFavoritesForStoreQuery = ({
  language = "en-US",
  session_id,
}: {
  language?: string;
  session_id?: string;
} = {}) => {
  const { isLoaded, setFavorites } = useFavoritesStore();

  return useQuery({
    queryKey: ["allFavorites", language, session_id],
    queryFn: async (): Promise<number[]> => {
      const firstPageResponse = await getFavorites({
        language,
        page: 1,
        session_id,
      });

      const totalPages = firstPageResponse.total_pages;
      const allFavorites: number[] = [];

      allFavorites.push(...firstPageResponse.results.map((movie) => movie.id));

      if (totalPages > 1) {
        const remainingPages = Array.from(
          { length: totalPages - 1 },
          (_, i) => i + 2
        );

        const remainingPagesData = await Promise.all(
          remainingPages.map((page) =>
            getFavorites({
              language,
              page,
              session_id,
            })
          )
        );

        remainingPagesData.forEach((response) => {
          allFavorites.push(...response.results.map((movie) => movie.id));
        });
      }

      setFavorites(allFavorites);
      return allFavorites;
    },
    enabled: !isLoaded,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};
