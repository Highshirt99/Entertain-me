import React from "react";
import { MdMovie, MdTv } from "react-icons/md";
import { MovieItemType } from "../utils/Types";
import { Link } from "react-router-dom";

type MovieItemProp = {
  movies?: MovieItemType[];
};

const MovieCard = ({ movies }: MovieItemProp) => {
  const imgBaseUrl = "https://image.tmdb.org/t/p";

  return (
    <div className="grid grid-cols-4">
      {movies?.map((movie) => (
        <div key={movie.id}>
          <Link to={`/movie/${movie.id}`}>
            <img
              src={`${imgBaseUrl}/original/${movie.poster_path!}`}
              alt=""
              width="120px"
              className="h-[80px] object-cover rounded-md hover:scale-110 cursor-pointer"
            />
          </Link>
          <div className="mt-2">
            <p className="text-white text-[12px] w-[120px]">{movie.title}</p>
            <div className="text-gray-500 flex gap-5 items-center">
              <p className="text-gray-500">
                {movie.release_date?.split("-")[0]}
              </p>
              <div className="flex items-center gap-1">
                {movie.media_type === "movie" && (
                  <MdMovie className="text-[13px]" />
                )}
                {movie.media_type === "tv" && <MdTv className="text-[13px]" />}
                <p className="text-gray-500 mb-1">{movie.media_type}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieCard;
