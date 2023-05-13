import React, { useState, useEffect } from "react";
import { moviesApiRequest } from "../utils/MovieApiRequest";
import { MovieItemType } from "../utils/Types";
import MovieCarousel from "../components/MoviesCarousel";

const Trending = () => {
  const [movies, setMovies] = useState<MovieItemType[]>([]);
  const [trendingOption, setTrendingOption] = useState<string>("day");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getTrendingMovies = async (): Promise<MovieItemType[]> => {
    const response = await (
      await moviesApiRequest.get(`/trending/all/${trendingOption}`)
    ).data.results;

    setMovies(response);
    return response;
  };

  useEffect(() => {
    getTrendingMovies();
  }, [getTrendingMovies]);

  return (
    <div className="h-[280px] p-[1rem]">
      <div className="flex items-center gap-3 mb-3">
        <h1 className="text-white font-bold tracking-wide py-4 text-[20px]">
          Trending {trendingOption === "day" ? "today" : "this week"}
        </h1>
        `
        <select
          name="trending"
          id=""
          className="p-1 text-blue-800 rounded-md outline-none cursor-pointer"
          onChange={(e) => setTrendingOption(e.target.value)}
        >
          <option value="day">day</option>
          <option value="week">week</option>
        </select>
      </div>
      <MovieCarousel movies={movies} />
    </div>
  );
};

export default Trending;
