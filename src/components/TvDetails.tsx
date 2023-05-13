import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { moviesApiRequest } from "../utils/MovieApiRequest";
import Header from "./Header";
import Footer from "./Footer";
import Search from "./Search";
import { CastType, MovieItemType } from "../utils/Types";
import SimilarSeries from "../MovieCategories.tsx/SimilarSeries";

const TvDetails = () => {
  const { id } = useParams();
  const [tvDetails, setTvDetails] = useState<MovieItemType>({});
  const [casts, setCasts] = useState<CastType[]>([]);
  // const [tvDetails, setTvDetails] = useState<MovieItemType>({});
  const imgBaseUrl = "https://image.tmdb.org/t/p";

  useEffect(() => {
    const getTvDetails = async () => {
      const response = await moviesApiRequest.get(`/tv/${id}`);
      setTvDetails(response.data);
    };

    const getCasts = async () => {
      const response = await moviesApiRequest.get(`/tv/${id}/credits`);
      setCasts(response.data.cast);
    };
    getTvDetails();
    getCasts();
    // const getTvDetails = async () => {
    //   const response = await moviesApiRequest.get(`/tv/${id}`);
    //   setTvDetails(response.data);
    //   console.log(tvDetails)
    // };

    // getTvDetails()
  });

  return (
    <div>
      <Header />
      <Search />
      <div
        className="text-white  p-[1rem] flex flex-col lg:flex-row
      gap-6 lg:gap-12"
      >
        <img
          src={`${imgBaseUrl}/original/${
            tvDetails.backdrop_path
              ? tvDetails.backdrop_path
              : tvDetails.poster_path
          }`}
          alt=""
          className="h-[250px] lg:h-[500px] w-full lg:w-[300px] object-cover rounded-md"
        />
        <div className="lg:flex-3 flex flex-col gap-4 min-h-[800px]">
          <div>
            <p>{tvDetails?.name}</p>
            <p className="text-sm text-gray-500">{tvDetails?.tagline}</p>
          </div>
          <span className="border-b-[4px] border-b-red-600 w-fit  pb-1">
            Description
          </span>
          <p className="lg:w-[600px] text-gray-500">{tvDetails?.overview}</p>
          <p className="text-sm">
            Votes:
            <span className="text-gray-500"> {tvDetails?.vote_count}</span>
          </p>
          <p className="text-sm">
            First Air Date:
            <span className="text-gray-500"> {tvDetails?.first_air_date}</span>
          </p>
          <p className="text-sm">
            Status:
            <span className="text-gray-500"> {tvDetails?.status}</span>
          </p>
          <div className="flex flex-col gap-3 text-sm">
            <p className="border-b-[4px] border-b-red-600 w-fit  pb-1">
              Genres
            </p>
            <ul className="flex gap-4 p-2 rounded-md bg-textCol w-fit">
              {tvDetails?.genres?.map((item) => (
                <li
                  key={item.name}
                  className="pr-2 border-r border-white last-of-type:border-none"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3 text-sm">
            <p className="border-b-[4px] border-b-red-600 w-fit  pb-1">
              Languages
            </p>
            <ul className="flex gap-4 p-2 rounded-md bg-textCol w-fit">
              {tvDetails?.spoken_languages?.map((item) => (
                <li
                  key={item.english_name}
                  className="pr-2 border-r border-white last-of-type:border-r-none last-of-type:border-none"
                >
                  {item.english_name}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-sm">
            Duration:
            <span className="text-gray-500"> {tvDetails.episode_run_time} mins</span>
          </p>

          <div className="flex flex-col gap-4 text-sm p-[1rem]">
            <p className="border-b-[4px] border-b-red-600 w-fit  pb-1">Casts</p>
            <div className="grid grid-cols-3 gap-4 rounded-md lg:grid-cols-6">
              {casts.map((cast) => (
                <p key={cast.cast_id} className="font-bold w-fit">
                  {cast.original_name}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <SimilarSeries id={id} />
      <Footer />
    </div>
  );
};

export default TvDetails;
