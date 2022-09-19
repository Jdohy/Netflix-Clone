import { useQuery } from "react-query";
import styled from "styled-components";
import { getTv, IGetMoviesResult, IMovie } from "../api";
import Slider from "../Components/Slider";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  background: ${(props) => props.theme.black.veryDark};
`;

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
  padding: 10px;
  text-align: center;
  display: flex;
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

function Tv() {
  const { data: onTheAir, isLoading: onTheAirLoading } =
    useQuery<IGetMoviesResult>(["Tv", "onTheAir"], () => getTv("on_the_air"));
  const { data: topRated, isLoading: topRatedLoading } =
    useQuery<IGetMoviesResult>(["Tv", "topRated"], () => getTv("top_rated"));
  const { data: popular, isLoading: popularLoading } =
    useQuery<IGetMoviesResult>(["Tv", "popular"], () => getTv("popular"));
  const { data: airing, isLoading: airingLoading } = useQuery<IGetMoviesResult>(
    ["Tv", "airing"],
    () => getTv("airing_today")
  );
  const { data: latest, isLoading: latestLoading } = useQuery<IMovie>(
    ["movies", "latest"],
    () => getTv("latest")
  );
  const fetchedData = [onTheAir, topRated, popular, airing];
  return (
    <Wrapper>
      {onTheAirLoading &&
      topRatedLoading &&
      popularLoading &&
      airingLoading &&
      latestLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(onTheAir?.results[0].backdrop_path || "")}
          >
            <Title>{onTheAir?.results[0].name}</Title>
            <Overview>{onTheAir?.results[0].overview}</Overview>
            <LatestContent>
              <span>Latest Content...</span>
              <span>{latest?.name}</span>
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

export default Tv;
