export const IMAGE_CONFIG = {
  BASE_URL: "https://image.tmdb.org/t/p",
  SIZES: {
    POSTER: {
      SMALL: "w200",
      MEDIUM: "w300",
      LARGE: "w500",
      XLARGE: "w780",
    },
    BACKDROP: {
      SMALL: "w300",
      MEDIUM: "w780",
      LARGE: "w1280",
      XLARGE: "original",
    },
    PROFILE: {
      SMALL: "w45",
      MEDIUM: "w185",
      LARGE: "w632",
    },
  },
} as const;

export const getImageUrl = (
  path: string | null | undefined,
  size: string = IMAGE_CONFIG.SIZES.POSTER.SMALL
): string | null => {
  if (!path) return null;
  return `${IMAGE_CONFIG.BASE_URL}/${size}${path}`;
};