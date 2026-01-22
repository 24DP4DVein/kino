import { User, UserData } from '../types';

const KEYS = {
  USERS: 'moviedb_users',
  CURRENT_USER: 'moviedb_current_user',
  WATCHLIST_PREFIX: 'moviedb_watchlist_',
  RATINGS_PREFIX: 'moviedb_ratings_',
};

export const StorageService = {
  getUsers: (): User[] => {
    const users = localStorage.getItem(KEYS.USERS);
    return users ? JSON.parse(users) : [];
  },

  saveUser: (user: User): void => {
    const users = StorageService.getUsers();
    users.push(user);
    localStorage.setItem(KEYS.USERS, JSON.stringify(users));
  },

  getCurrentUser: (): User | null => {
    const user = localStorage.getItem(KEYS.CURRENT_USER);
    return user ? JSON.parse(user) : null;
  },

  setCurrentUser: (user: User | null): void => {
    if (user) {
      localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(KEYS.CURRENT_USER);
    }
  },

  getUserData: (userId: string): UserData => {
    const watchlist = localStorage.getItem(KEYS.WATCHLIST_PREFIX + userId);
    const ratings = localStorage.getItem(KEYS.RATINGS_PREFIX + userId);
    return {
      watchlist: watchlist ? JSON.parse(watchlist) : [],
      ratings: ratings ? JSON.parse(ratings) : {},
    };
  },

  toggleWatchlist: (userId: string, movieId: number): number[] => {
    const key = KEYS.WATCHLIST_PREFIX + userId;
    const current = localStorage.getItem(key);
    let list: number[] = current ? JSON.parse(current) : [];
    
    if (list.includes(movieId)) {
      list = list.filter(id => id !== movieId);
    } else {
      list.push(movieId);
    }
    
    localStorage.setItem(key, JSON.stringify(list));
    return list;
  },

  setUserRating: (userId: string, movieId: number, rating: number): Record<number, number> => {
    const key = KEYS.RATINGS_PREFIX + userId;
    const current = localStorage.getItem(key);
    const ratings: Record<number, number> = current ? JSON.parse(current) : {};
    
    ratings[movieId] = rating;
    
    localStorage.setItem(key, JSON.stringify(ratings));
    return ratings;
  }
};
