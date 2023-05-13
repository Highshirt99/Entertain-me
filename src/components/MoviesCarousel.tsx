import React from "react";
import { MovieItemType } from "../utils/Types";
import image from "../assets/loaderImg.jpg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { MdMovie, MdTv } from "react-icons/md";
import { Link } from "react-router-dom";

type MovieItemProp = {
  movies?: MovieItemType[];
};

const MoviesCarousel = ({ movies }: MovieItemProp) => {
  const imgBaseUrl = "https://image.tmdb.org/t/p";

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 8,
      slidesToSlide: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 7,
      slidesToSlide: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
      slidesToSlide: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
      slidesToSlide: 2,
    },
  };
  return (
    <div>
      {movies?.length === 0 && (
        <div className="flex items-center justify-center mt-[100px]">
          <img src={image} alt="" width="50px" />
        </div>
      )}

      <Carousel responsive={responsive} swipeable={true}>
        {movies?.map((movie) => (
          <div key={movie.id}>
            <Link to={movie.media_type === "tv" ? `/tv/${movie.id}` : `/movie/${movie.id}`}>
              <img
                src={`${imgBaseUrl}/original/${movie.poster_path!}`}
                alt=""
                width="100px"
                className="h-[80px] object-cover rounded-md hover:scale-110 cursor-pointer"
              />
            </Link>
            <div className="flex flex-col gap-3 mt-2 ">
              <p className="text-white text-[12px] w-[120px]">
                {movie.media_type === "tv" ? movie.name : movie.title}
              </p>
              <div className="flex items-center gap-5 text-gray-500">
                <p className="text-gray-500">
                  {movie.media_type === "tv"
                    ? movie.first_air_date?.split("-")[0]
                    : movie.release_date?.split("-")[0]}
                </p>
                <div className="flex items-center gap-1">
                  {movie.media_type === "tv" ? (
                    <MdTv className="text-[13px]" />
                  ) : (
                    <MdMovie className="text-[13px]" />
                  )}

                  <p className="mb-1 text-gray-500">
                    {movie.media_type === "tv" ? "tv" : "movie"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default MoviesCarousel;
