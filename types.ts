export interface Movie {
  id: number;
  title: string;
  year: number;
  rating: number; // IMDb style rating
  genres: string[];
  duration: string;
  description: string;
  cast: string[];
  posterGradient: string; // CSS gradient for placeholder
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string; // Insecure for demo purposes
  createdAt: number;
}

export interface UserData {
  watchlist: number[];
  ratings: Record<number, number>; // movieId -> userRating
}

export type SortOption = 'rating_desc' | 'year_desc' | 'title_asc';
