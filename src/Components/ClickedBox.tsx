import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { getMovies, getTv, IDetail, IGetMoviesResult } from "../api";
import { keywordState } from "../atoms";
import { makeImagePath } from "../utils";

const Overlay = styled(motion.div)`
  position: fixed;
  z-index: 98;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  z-index: 99;
  width: 40vw;
  height: 85vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.9);
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 500px;
`;

const BigTitle = styled.h3`
  filter: contrast(300%);
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
  font-size: 20px;
  filter: contrast(300%);
  font-weight: 300;
`;

const BigMetaCategory = styled.span`
  color: rgba(255, 255, 255, 0.5);
  margin-right: 5px;
`;

const BigGenres = styled.ul`
  display: flex;
  li {
    margin-right: 10px;
  }
  margin-bottom: 10px;
`;

const BigMeta = styled.div`
  padding: 20px;
  position: relative;
  top: -80px;
  display: flex;
  flex-direction: column;
  filter: contrast(300%);
`;

const BigPopular = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

interface ISliderProps {
  data?: IGetMoviesResult;
  idx: number;
  category?: string;
}

function ClickedBox({ data, idx, category }: ISliderProps) {
  const keyword = useRecoilValue(keywordState);
  const bigMovieMatch = useMatch("/movies/:movieId");
  const bigTvMatch = useMatch("/tv/:tvId");
  const searched = useMatch(`/search/${category}/:id`);
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const onOverlayClick = () => {
    if (bigMovieMatch) navigate("/");
    else if (bigTvMatch) navigate("/tv");
    else if (searched) navigate(`/search?keyword=${keyword}`);
  };
  const clickedMovie: any =
    bigMovieMatch?.params.movieId &&
    data?.results.find(
      (movie) => `${idx}=${movie.id}` === bigMovieMatch?.params.movieId
    );

  const clickedSearchd: any =
    searched?.params.id &&
    data?.results.find(
      (contents) => `${idx}=${contents.id}` === searched?.params.id
    );

  const clickedTv: any =
    bigTvMatch?.params.tvId &&
    data?.results.find((tv) => `${idx}=${tv.id}` === bigTvMatch?.params.tvId);

  const { data: movieDetail } = useQuery<IDetail>(
    ["movies", "Detail"],
    () => getMovies(clickedMovie.id),
    {
      enabled: !!clickedMovie,
    }
  );

  const { data: searchedDetail } = useQuery<IDetail>(
    ["movies", "Detail"],
    () => {
      if (idx === 100) {
        return getMovies(clickedSearchd.id);
      } else {
        return getTv(clickedSearchd.id);
      }
    },
    {
      enabled: !!clickedSearchd,
    }
  );

  const { data: tvDetail } = useQuery<IDetail>(
    ["tvs", "Detail"],
    () => getTv(clickedTv.id),
    {
      enabled: !!clickedTv,
    }
  );

  return (
    <AnimatePresence>
      {clickedMovie ? (
        <>
          <Overlay
            onClick={onOverlayClick}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <BigMovie
            layoutId={bigMovieMatch?.params.movieId}
            style={{
              top: scrollY.get() + 100,
            }}
          >
            {clickedMovie && (
              <>
                <BigCover
                  style={{
                    backgroundImage: `linear-gradient(to top,black,transparent), url(${makeImagePath(
                      clickedMovie.backdrop_path
                    )})`,
                  }}
                />
                <BigTitle>{clickedMovie.title}</BigTitle>
                <BigMeta>
                  <BigGenres>
                    <BigMetaCategory>Genres:</BigMetaCategory>
                    {movieDetail?.genres.map((genre) => (
                      <li key={genre.id}> {genre.name}</li>
                    ))}
                  </BigGenres>
                  <BigPopular>
                    <BigMetaCategory>Popular:</BigMetaCategory>
                    <span>{movieDetail?.popularity.toFixed()} </span>
                  </BigPopular>
                  <BigPopular>
                    <BigMetaCategory>Vote Average:</BigMetaCategory>
                    <span>{movieDetail?.vote_average.toFixed(1)} </span>
                  </BigPopular>
                  <BigPopular>
                    <BigMetaCategory>Released at:</BigMetaCategory>
                    <span>{movieDetail?.release_date} </span>
                  </BigPopular>
                </BigMeta>
                <BigOverview>{movieDetail?.overview}</BigOverview>
              </>
            )}
          </BigMovie>
        </>
      ) : clickedTv ? (
        <>
          <Overlay
            onClick={onOverlayClick}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <BigMovie
            layoutId={bigTvMatch?.params.tvId}
            style={{
              top: scrollY.get() + 100,
            }}
          >
            {clickedTv && (
              <>
                <BigCover
                  style={{
                    backgroundImage: `linear-gradient(to top,black,transparent), url(${makeImagePath(
                      clickedTv.backdrop_path
                    )})`,
                  }}
                />
                <BigTitle>{clickedTv.name}</BigTitle>
                <BigMeta>
                  <BigGenres>
                    <BigMetaCategory>Genres:</BigMetaCategory>
                    {tvDetail?.genres.map((genre) => (
                      <li key={genre.id}> {genre.name}</li>
                    ))}
                  </BigGenres>
                  <BigPopular>
                    <BigMetaCategory>Popular:</BigMetaCategory>
                    <span>{tvDetail?.popularity.toFixed()} </span>
                  </BigPopular>
                  <BigPopular>
                    <BigMetaCategory>Vote Average:</BigMetaCategory>
                    <span>{tvDetail?.vote_average.toFixed(1)} </span>
                  </BigPopular>
                  <BigPopular>
                    <BigMetaCategory>First air date:</BigMetaCategory>
                    <span>{tvDetail?.first_air_date} </span>
                  </BigPopular>
                </BigMeta>
                <BigOverview>{tvDetail?.overview}</BigOverview>
              </>
            )}
          </BigMovie>
        </>
      ) : searched ? (
        <>
          <Overlay
            onClick={onOverlayClick}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <BigMovie
            layoutId={searched?.params.id}
            style={{
              top: scrollY.get() + 100,
            }}
          >
            {clickedSearchd && (
              <>
                <BigCover
                  style={{
                    backgroundImage: `linear-gradient(to top,black,transparent), url(${makeImagePath(
                      clickedSearchd.backdrop_path
                    )})`,
                  }}
                />
                <BigTitle>
                  {category === "movie"
                    ? clickedSearchd.title
                    : clickedSearchd.name}
                </BigTitle>
                <BigMeta>
                  <BigGenres>
                    <BigMetaCategory>Genres:</BigMetaCategory>
                    {searchedDetail?.genres.map((genre) => (
                      <li key={genre.id}> {genre.name}</li>
                    ))}
                  </BigGenres>
                  <BigPopular>
                    <BigMetaCategory>Popular:</BigMetaCategory>
                    <span>{searchedDetail?.popularity.toFixed()} </span>
                  </BigPopular>
                  <BigPopular>
                    <BigMetaCategory>Vote Average:</BigMetaCategory>
                    <span>{searchedDetail?.vote_average.toFixed(1)} </span>
                  </BigPopular>
                  {category === "movie" ? (
                    <BigPopular>
                      <BigMetaCategory>Released at:</BigMetaCategory>
                      <span>{searchedDetail?.release_date} </span>
                    </BigPopular>
                  ) : (
                    <BigPopular>
                      <BigMetaCategory>First air date:</BigMetaCategory>
                      <span>{searchedDetail?.first_air_date} </span>
                    </BigPopular>
                  )}
                </BigMeta>
                <BigOverview>{searchedDetail?.overview}</BigOverview>
              </>
            )}
          </BigMovie>
        </>
      ) : null}
    </AnimatePresence>
  );
}

export default ClickedBox;
