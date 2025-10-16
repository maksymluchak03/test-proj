import { useMovieStore } from "@/stores/movieStore";
import { useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";

import { useFavoritesForStoreQuery } from "@/hooks/api/useFavoritesForStoreQuery";
import { useDebounce } from "@/hooks/useDebounce";

import { options } from "@/constants/options";
import { MovieSortField, SortOrder } from "@/types/api/movie";

import MovieItem from "@/components/items/MovieItem";
import ScreenContainer from "@/components/layout/ScreenLayout";
import CustomSelect from "@/components/ui/CustomSelect";
import CustomTextInput from "@/components/ui/CustomTextInput";
import Pagination from "@/components/ui/Pagination";
import { useMovies } from "@/hooks/api/useMovieQuery";

export default function HomeScreen() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<MovieSortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [genre, setGenre] = useState<string[] | null>(null);
  const { isLoading: isLoadingFavorites } = useFavoritesForStoreQuery({});

  const [openSelectId, setOpenSelectId] = useState<string | null>(null);

  const { genres } = useMovieStore();

  const debouncedSearchMovieTitle = useDebounce({ value: search, delay: 500 });

  const { data: moviesData, isLoading } = useMovies({
    query: debouncedSearchMovieTitle,
    page: currentPage,
    sort_by: sortBy ? `${sortBy}.${sortOrder}` : undefined,
    sortOrder,
    genre: genre ?? undefined,
  });

  return (
    <ScreenContainer style={{ gap: 8 }}>
      <CustomTextInput
        placeholder="Search"
        value={search}
        onChangeText={setSearch}
      />
      {!debouncedSearchMovieTitle && (
        <>
          <CustomSelect
            selectId="sort-select"
            openSelectId={openSelectId}
            setOpenSelectId={setOpenSelectId}
            sortable
            sortableValue={sortOrder}
            onSortableChange={setSortOrder}
            placeholder="Sort by title"
            value={sortBy}
            onChange={(value) => setSortBy(value as MovieSortField)}
            options={options.sortBy}
          />

          <CustomSelect
            multiple
            selectId="genre-select"
            openSelectId={openSelectId}
            setOpenSelectId={setOpenSelectId}
            placeholder="Genre"
            value={genre}
            onChange={(value) => setGenre(value as string[])}
            options={genres.map((genre) => ({
              label: genre.name,
              value: genre.id.toString(),
            }))}
          />
        </>
      )}

      {isLoading || isLoadingFavorites ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <FlatList
          data={moviesData?.results}
          renderItem={({ item }) => (
            <MovieItem movie={item} containerStyle={{ marginBottom: 8 }} />
          )}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => (
            <Pagination
              currentPage={currentPage}
              totalPages={moviesData?.total_pages ?? 1}
              onPageChange={setCurrentPage}
            />
          )}
        />
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
