import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getSearchMovie, getSearchTv, IGetMoviesResult } from "../api";
import Slider from "../Components/Slider";

const Wrapper = styled.div``;

const Sliders = styled.div`
  margin-top: 250px;
  display: flex;
  flex-direction: column;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  let { data: movieData, isLoading: movieLoading } = useQuery<IGetMoviesResult>(
    ["movies", "serachMovies"],
    () => getSearchMovie(keyword)
  );
  const { data: tvData, isLoading: tvLoading } = useQuery<IGetMoviesResult>(
    ["tv", "searchTv"],
    () => getSearchTv(keyword)
  );

  const movieResults = movieData?.results.filter(
    (movie) => movie.poster_path && movie.backdrop_path
  );
  const tvResults = tvData?.results.filter(
    (tv) => tv.poster_path && tv.backdrop_path
  );

  return (
    <Wrapper>
      {movieLoading && tvLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Sliders>
          <Slider
            data={movieData}
            results={movieResults}
            idx={100}
            category="movie"
          />
          <Slider data={tvData} results={tvResults} idx={101} category="tv" />
        </Sliders>
      )}
    </Wrapper>
  );
}

export default Search;
