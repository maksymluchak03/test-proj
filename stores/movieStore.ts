import { Genre } from "@/types/api/movie";
import { create } from "zustand";

export interface MovieStore {
  genres: Genre[];
  setGenres: (genres: Genre[]) => void;
  getGenreName: (genreId: number) => string | undefined;
}

export const useMovieStore = create<MovieStore>()(
  (set, get) => ({
    genres: [],
    setGenres: (genres) => set({ genres }),
    getGenreName: (genreId) => {
      const { genres } = get();
      return genres.find((genre) => genre.id === genreId)?.name;
    },
  })
);
