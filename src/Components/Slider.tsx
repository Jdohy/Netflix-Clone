import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { makeImagePath } from "../utils";
import { IGetMoviesResult, IMovie } from "../api";
import styled from "styled-components";
import ClickedBox from "./ClickedBox";

const offset = 9;

const Wrapper = styled.div`
  position: relative;
  top: -100px;
  margin: 0px 60px;
  margin-bottom: 450px;
`;

const SliderCatogry = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 35px;
  font-weight: 300;
  margin-bottom: 10px;
`;

const Category = styled.h3``;

const Arrow = styled(motion.div)`
  font-size: 50px;
  position: relative;
  bottom: -15px;
  z-index: 100;
  cursor: pointer;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(9, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  border-radius: 5px;
  height: 380px;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  font-size: 66px;
  box-shadow: rgba(255, 255, 255, 0.4) 5px 5px,
    rgba(209, 209, 209, 0.3) 10px 10px, rgba(156, 156, 156, 0.2) 15px 15px,
    rgba(98, 98, 98, 0.1) 20px 20px, rgba(0, 0, 0, 0.05) 25px 25px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.3,
      duration: 0.2,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.2,
      type: "tween",
    },
  },
};

interface ISliderProps {
  data?: IGetMoviesResult;
  idx: number;
  results?: IMovie[];
  category?: string;
}

function Slider({ data, idx, category, results }: ISliderProps) {
  const tvMatch = useMatch("/tv");
  const searchMatch = useMatch("/search");
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const navigate = useNavigate();
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 2;
      const maxIndex = Math.ceil(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (id: number) => {
    console.log(category);
    if (tvMatch) {
      navigate(`/tv/${idx}=${id}`);
    } else if (searchMatch) {
      navigate(`/search/${category}/${idx}=${id}`);
    } else {
      navigate(`/movies/${idx}=${id}`);
    }
  };
  return (
    <>
      <Wrapper>
        <SliderCatogry>
          <Category>
            {idx === 0
              ? "Go Watch right now !"
              : idx === 1
              ? "Masterpiece seriese"
              : idx === 2
              ? "Popular seriese"
              : idx === 100
              ? "Searchd Movies..."
              : idx === 101
              ? "Searched Tv Series..."
              : idx === 3 && tvMatch
              ? "Airing today..."
              : "Coming soon"}
          </Category>
          <Arrow onClick={increaseIndex}>→</Arrow>
        </SliderCatogry>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
          <Row
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 0.7 }}
            key={index}
          >
            {idx === 0
              ? data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      layoutId={`${idx}=${movie.id}`}
                      variants={boxVariants}
                      key={`${idx}=${movie.id}`}
                      initial="normal"
                      whileHover="hover"
                      onClick={() => onBoxClicked(movie.id)}
                      transition={{ type: "tween" }}
                      bgPhoto={makeImagePath(movie.poster_path, "w500")}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title ? movie.title : movie.name}</h4>
                      </Info>
                    </Box>
                  ))
              : !results
              ? data?.results
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      layoutId={`${idx}=${movie.id}`}
                      variants={boxVariants}
                      key={`${idx}=${movie.id}`}
                      initial="normal"
                      whileHover="hover"
                      onClick={() => onBoxClicked(movie.id)}
                      transition={{ type: "tween" }}
                      bgPhoto={makeImagePath(movie.poster_path, "w500")}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title ? movie.title : movie.name}</h4>
                      </Info>
                    </Box>
                  ))
              : results
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      layoutId={`${idx}=${movie.id}`}
                      variants={boxVariants}
                      key={`${idx}=${movie.id}`}
                      initial="normal"
                      whileHover="hover"
                      onClick={() => onBoxClicked(movie.id)}
                      transition={{ type: "tween" }}
                      bgPhoto={makeImagePath(movie.poster_path, "w500")}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title ? movie.title : movie.name}</h4>
                      </Info>
                    </Box>
                  ))}
          </Row>
        </AnimatePresence>
      </Wrapper>
      <ClickedBox data={data} idx={idx} category={category} />
    </>
  );
}

export default Slider;
