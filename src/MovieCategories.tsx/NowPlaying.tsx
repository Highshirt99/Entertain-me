import React, { useState, useEffect } from "react";
import { moviesApiRequest } from "../utils/MovieApiRequest";
import { MovieItemType } from "../utils/Types";
import MoviesCarousel from "../components/MoviesCarousel";

const NowPlaying = () => {
  const [movies, setMovies] = useState<MovieItemType[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getTrendingMovies = async (): Promise<MovieItemType[]> => {
    const response = await (
      await moviesApiRequest.get("/movie/now_playing")
    ).data.results;

    setMovies(response);
    return response;
  };

  useEffect(() => {
    getTrendingMovies();
  }, [getTrendingMovies]);
  return (
    <div className="p-[1rem] h-auto">
      <h1 className="text-white font-bold tracking-wide py-4 text-[20px]">
        Now Playing
      </h1>
      <MoviesCarousel movies={movies} />
    </div>
  );
};

export default NowPlaying;
