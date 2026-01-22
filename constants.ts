import { Movie } from './types';

export const GENRES = ['All', 'Action', 'Drama', 'Comedy', 'Sci-Fi', 'Thriller', 'Adventure', 'Fantasy', 'Crime'];

export const MOVIES: Movie[] = [
  {
    id: 1,
    title: "Inception",
    year: 2010,
    rating: 8.8,
    genres: ["Action", "Sci-Fi", "Thriller"],
    duration: "2h 28m",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
    posterGradient: "from-blue-600 to-gray-900"
  },
  {
    id: 2,
    title: "The Dark Knight",
    year: 2008,
    rating: 9.0,
    genres: ["Action", "Crime", "Drama"],
    duration: "2h 32m",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    posterGradient: "from-gray-700 to-black"
  },
  {
    id: 3,
    title: "Interstellar",
    year: 2014,
    rating: 8.6,
    genres: ["Adventure", "Drama", "Sci-Fi"],
    duration: "2h 49m",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    posterGradient: "from-indigo-900 to-purple-900"
  },
  {
    id: 4,
    title: "Parasite",
    year: 2019,
    rating: 8.5,
    genres: ["Drama", "Thriller", "Comedy"],
    duration: "2h 12m",
    description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    cast: ["Kang-ho Song", "Sun-kyun Lee", "Yeo-jeong Cho"],
    posterGradient: "from-green-800 to-black"
  },
  {
    id: 5,
    title: "The Matrix",
    year: 1999,
    rating: 8.7,
    genres: ["Action", "Sci-Fi"],
    duration: "2h 16m",
    description: "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    posterGradient: "from-green-600 to-gray-900"
  },
  {
    id: 6,
    title: "Pulp Fiction",
    year: 1994,
    rating: 8.9,
    genres: ["Crime", "Drama"],
    duration: "2h 34m",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
    posterGradient: "from-red-800 to-yellow-900"
  },
  {
    id: 7,
    title: "The Grand Budapest Hotel",
    year: 2014,
    rating: 8.1,
    genres: ["Adventure", "Comedy", "Crime"],
    duration: "1h 39m",
    description: "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel's glorious years under an exceptional concierge.",
    cast: ["Ralph Fiennes", "F. Murray Abraham", "Mathieu Amalric"],
    posterGradient: "from-pink-700 to-purple-800"
  },
  {
    id: 8,
    title: "Dune: Part Two",
    year: 2024,
    rating: 8.6,
    genres: ["Action", "Adventure", "Sci-Fi"],
    duration: "2h 46m",
    description: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"],
    posterGradient: "from-orange-700 to-yellow-900"
  },
  {
    id: 9,
    title: "Spirited Away",
    year: 2001,
    rating: 8.6,
    genres: ["Adventure", "Family", "Fantasy"],
    duration: "2h 5m",
    description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
    cast: ["Daveigh Chase", "Suzanne Pleshette", "Miyu Irino"],
    posterGradient: "from-teal-600 to-blue-800"
  },
  {
    id: 10,
    title: "Fight Club",
    year: 1999,
    rating: 8.8,
    genres: ["Drama"],
    duration: "2h 19m",
    description: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
    cast: ["Brad Pitt", "Edward Norton", "Meat Loaf"],
    posterGradient: "from-pink-900 to-red-900"
  },
  {
    id: 11,
    title: "Gladiator",
    year: 2000,
    rating: 8.5,
    genres: ["Action", "Adventure", "Drama"],
    duration: "2h 35m",
    description: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
    cast: ["Russell Crowe", "Joaquin Phoenix", "Connie Nielsen"],
    posterGradient: "from-yellow-700 to-orange-900"
  },
  {
    id: 12,
    title: "Avengers: Endgame",
    year: 2019,
    rating: 8.4,
    genres: ["Action", "Adventure", "Drama"],
    duration: "3h 1m",
    description: "After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions.",
    cast: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo"],
    posterGradient: "from-purple-800 to-blue-900"
  }
];
