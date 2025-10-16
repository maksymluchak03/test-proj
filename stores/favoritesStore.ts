import { create } from "zustand";

interface FavoritesStore {
  favorites: number[];
  isLoaded: boolean;
  addFavorite: (movieId: number) => void;
  removeFavorite: (movieId: number) => void;
  toggleFavorite: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
  setFavorites: (favorites: number[]) => void;
  setLoaded: (loaded: boolean) => void;
}

export const useFavoritesStore = create<FavoritesStore>()((set, get) => ({
  favorites: [],
  isLoaded: false,

  addFavorite: (movieId) => {
    set((state) => {
      const exists = state.favorites.includes(movieId);
      if (exists) return state;

      return {
        favorites: [...state.favorites, movieId],
      };
    });
  },

  removeFavorite: (movieId) => {
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== movieId),
    }));
  },

  toggleFavorite: (movieId) => {
    const { isFavorite, addFavorite, removeFavorite } = get();
    if (isFavorite(movieId)) {
      removeFavorite(movieId);
    } else {
      addFavorite(movieId);
    }
  },

  isFavorite: (movieId) => {
    return get().favorites.includes(movieId);
  },

  setFavorites: (favorites) => {
    set({ favorites, isLoaded: true });
  },

  setLoaded: (loaded) => {
    set({ isLoaded: loaded });
  },
}));
