import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import { getImageUrl, IMAGE_CONFIG } from "@/utils/imageUrl";
import {
  useFavoriteMovie,
  useMovieCreditsQuery,
  useMovieGenreQuery,
} from "@/hooks/api/useMovieQuery";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Movie } from "@/types/api/movie";
import { T } from "../ui/T";

export default function MovieItem({
  movie,
  containerStyle,
}: {
  movie: Movie;
  containerStyle?: StyleProp<ViewStyle>;
}) {
  const colors = useThemeColor();

  const { isFavorite, toggleFavorite, isPending } = useFavoriteMovie({
    media_id: movie.id,
    media_type: "movie",
  });

  const {
    data: movieGenres,
    isLoading: isLoadingGenres,
    error: errorGenres,
  } = useMovieGenreQuery();

  const {
    data: movieCredits,
    isLoading: isLoadingCredits,
    error: errorCredits,
  } = useMovieCreditsQuery(movie.id);

  const castNames =
    movieCredits?.cast.map((cast) => cast.name).join(", ") || "";

  const formatDate = (dateString: string) => {
    return new Date(dateString).getFullYear().toString();
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: colors.background },
        containerStyle,
      ]}
    >
      <View>
        <Image
          source={{
            uri:
              getImageUrl(movie.poster_path, IMAGE_CONFIG.SIZES.POSTER.SMALL) ||
              "",
          }}
          style={styles.poster}
          contentFit="cover"
          transition={200}
          cachePolicy="none"
          recyclingKey={movie.id.toString()}
        />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <T type="title" style={{ flex: 1 }} numberOfLines={2}>
            {movie.title}
          </T>
          <View style={styles.headerRight}>
            <View style={styles.ratingContainer}>
              <Ionicons name={"star"} size={24} color={colors.star} />
              <T type="title" style={{ color: colors.tint }}>
                {movie.vote_average.toFixed(1)}
              </T>
            </View>
            <View style={styles.favoriteContainer}>
              {isPending ? (
                <ActivityIndicator size="small" color={colors.tint} />
              ) : (
                <TouchableOpacity
                  onPress={() => toggleFavorite()}
                  disabled={isPending}
                >
                  <Ionicons
                    name={isFavorite ? "heart" : "heart-outline"}
                    size={24}
                    color={colors.tint}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        <T type="default" style={{ color: colors.icon }}>
          {formatDate(movie.release_date)}
        </T>

        {isLoadingGenres ? (
          <T type="default">Loading...</T>
        ) : (
          <View style={styles.genresContainer}>
            {movie.genre_ids.map((genre) => (
              <View
                key={genre}
                style={[
                  styles.genreTag,
                  { backgroundColor: colors.tint + "20" },
                ]}
              >
                <T type="defaultSemiBold" style={{ color: colors.tint }}>
                  {errorGenres ? (
                    <T type="default">Error loading genres</T>
                  ) : (
                    movieGenres?.genres.find((g) => g.id === genre)?.name
                  )}
                </T>
              </View>
            ))}
          </View>
        )}

        <T type="default" style={{ color: colors.text }} numberOfLines={3}>
          {movie.overview}
        </T>

        {castNames && (
          <View>
            <T type="defaultSemiBold" style={{ color: colors.icon }}>
              Cast:
            </T>
            {isLoadingCredits ? (
              <T type="default">Loading...</T>
            ) : errorCredits ? (
              <T type="default">Error loading actors</T>
            ) : (
              <T
                type="default"
                style={{ color: colors.text }}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {castNames}
              </T>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    gap: 8,
  },
  poster: {
    width: 80,
    height: 120,
    borderRadius: 8,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
    gap: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ratingContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 4,
  },
  genreTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  genresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  favoriteContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
