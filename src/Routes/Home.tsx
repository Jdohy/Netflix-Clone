import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, IGetMoviesResult, IMovie } from "../api";
import Slider from "../Components/Slider";
import { makeImagePath } from "../utils";

const Wrapper = styled.div``;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(
      rgba(0, 0, 0, 0),
      ${(props) => props.theme.black.veryDark}
    ),
    url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center;
`;

const LatestContent = styled.div`
  width: 400px;
  border-radius: 10px;
  height: 200px;
  position: absolute;
  right: 300px;
  background-color: rgba(0, 0, 0, 0.4);
  bottom: 150px;
  display: flex;
  padding: 10px;
  text-align: center;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  span:last-child {
    font-size: 40px;
  }
`;

const Title = styled.h2`
  font-size: 68px;
  filter: contrast(300%);
  margin-bottom: 40px;
`;

const Overview = styled.p`
  font-weight: 300;
  font-size: 28px;
  filter: contrast(300%);
  width: 50%;
`;

const Sliders = styled.div`
  display: flex;
  flex-direction: column;
`;

function Home() {
  const { data: nowPlaying, isLoading: nowLoading } =
    useQuery<IGetMoviesResult>(["movies", "nowPlaying"], () =>
      getMovies("now_playing")
    );
  const { data: topRated, isLoading: topRatedLoading } =
    useQuery<IGetMoviesResult>(["movies", "topRated"], () =>
      getMovies("top_rated")
    );
  const { data: popular, isLoading: popularLoading } =
    useQuery<IGetMoviesResult>(["movies", "popular"], () =>
      getMovies("popular")
    );
  const { data: upComing, isLoading: upComingLoading } =
    useQuery<IGetMoviesResult>(["movies", "upComing"], () =>
      getMovies("upcoming")
    );
  const { data: latest, isLoading: latestLoading } = useQuery<IMovie>(
    ["movies", "latest"],
    () => getMovies("latest")
  );
  if (latest) console.log(latest);
  const fetchedData = [nowPlaying, topRated, popular, upComing];
  return (
    <Wrapper>
      {nowLoading &&
      topRatedLoading &&
      popularLoading &&
      upComingLoading &&
      latestLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(nowPlaying?.results[0].backdrop_path || "")}
          >
            <Title>{nowPlaying?.results[0].title}</Title>
            <Overview>{nowPlaying?.results[0].overview}</Overview>
            <LatestContent>
              <span>Latest Content...</span>
              <span>{latest?.title}</span>
            </LatestContent>
          </Banner>
          <Sliders>
            {fetchedData.map((data, idx) => (
              <Slider key={idx} data={data} idx={idx} />
            ))}
          </Sliders>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
