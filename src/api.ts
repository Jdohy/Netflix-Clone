const API_KEY = "f0a49b2e9d20a396be901c79a0c1f950";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title?: string;
  name?: string;
  overview: string;
}

interface IGenres {
  id: number;
  name: string;
}

export interface IDetail {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  genres: IGenres[];
  popularity: number;
  vote_average: number;
  release_date: string;
  first_air_date: string;
}

/* interface ITv {
  id: number;
  backdrop_path: string;
  poster_path: string;
  name: string;
  overview: string;
} */

export interface IGetMoviesResult {
  dates: {
    maximun: string;
    minimun: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IGetMovieDetail {
  adult: boolean;
  backdrop_path: string;
  id: number;
}
/* 
export interface IGetTvResult {
  dates: {
    maximun: string;
    minimun: string;
  };
  page: number;
  results: ITv[];
  total_pages: number;
  total_results: number;
} */

export function getMovies(category: string) {
  return fetch(`${BASE_PATH}/movie/${category}?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getSearchMovie(keyword: string | null) {
  return fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${keyword}`
  ).then((response) => response.json());
}

export function getTv(category: string) {
  return fetch(`${BASE_PATH}/tv/${category}?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getSearchTv(keyword: string | null) {
  return fetch(
    `${BASE_PATH}/search/tv?api_key=${API_KEY}&query=${keyword}`
  ).then((response) => response.json());
}
