import MovieItem from "@/components/items/MovieItem";
import Pagination from "@/components/ui/Pagination";
import { useFavoritesQuery } from "@/hooks/api/useMovieQuery";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import ScreenLayout from "@/components/layout/ScreenLayout";

export default function FavoriteScreen() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: favorites } = useFavoritesQuery({
    page: currentPage,
  });

  useEffect(() => {
    if (favorites?.results.length === 0) {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  }, [favorites]);

  return (
    <ScreenLayout>
      <FlatList
        data={favorites?.results}
        renderItem={({ item }) => (
          <MovieItem movie={item} containerStyle={{ marginBottom: 8 }} />
        )}
        ListFooterComponent={() => (
          <Pagination
            currentPage={currentPage}
            totalPages={favorites?.total_pages ?? 1}
            onPageChange={setCurrentPage}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
