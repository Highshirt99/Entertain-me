import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { MovieItemType } from "../utils/Types";
import { moviesApiRequest } from "../utils/MovieApiRequest";
import loader from "../assets/loaderImg.jpg";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

type GenreType = {
  id: number;
  name: string;
};

const TV = () => {
  let genreNm = "";
  const [genreName, setGenreName] = useState<string>("");
  const [genreList, setGenreList] = useState<GenreType[]>([]);
  const [tvList, setTvList] = useState<MovieItemType[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [loading, setLoading] = useState(false);

  const seriesPerPage = 10;

  const pagesVisited = pageNumber * seriesPerPage;

  const pageCount = Math.ceil(tvList[0]?.length / seriesPerPage);

  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
  };

  const series: MovieItemType[] = [];

  const handleGetGenre = async (genre: number) => {
    setLoading(true)
    series.length = 0;
    const airingTodaySeries = (await moviesApiRequest.get("/tv/airing_today"))
      .data.results;
    const topRatedSeries = (await moviesApiRequest.get("/trending/tv/week"))
      .data.results;
    const popularSeries = (await moviesApiRequest.get("/tv/popular")).data
      .results;
    const onAir = (await moviesApiRequest.get("/tv/on_the_air")).data.results;

    if(airingTodaySeries || topRatedSeries || popularSeries || onAir) {
      setLoading(false)
    }
    const upcomingSeriesGenre = airingTodaySeries.filter(
      (series: MovieItemType) => series.genre_ids?.includes(genre)
    );
    const topRatedSeriesGenre = topRatedSeries.filter((series: MovieItemType) =>
      series.genre_ids?.includes(genre)
    );
    const onAirSeriesGenre = onAir.filter((series: MovieItemType) =>
      series.genre_ids?.includes(genre)
    );
    const popularSeriesGenre = popularSeries.filter((series: MovieItemType) =>
      series.genre_ids?.includes(genre)
    );

    const allSeries = upcomingSeriesGenre.concat(
      topRatedSeriesGenre,
      popularSeriesGenre,
      onAirSeriesGenre
    );

    series.push(allSeries);
    genreList.forEach((item) => {
      if (item.id === genre) {
        genreNm = item.name;
        setGenreName(genreNm);
      }
    });
    setTvList(series);
    return genre;
  };

  const displayMovies =
    tvList.length > 0 &&
    tvList[0]
      .slice(pagesVisited, pagesVisited + seriesPerPage)
      .map((series: MovieItemType, index: number) => (
        <div className="flex flex-col gap-2" key={index}>
          <Link to={`/tv/${series.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/original/${series.backdrop_path}`}
              alt="No pic"
              width={150}
              className="h-[100px] object-cover rounded-lg hover:scale-110 cursor-pointer text-white"
            />
          </Link>
          <h1 className="text-white text-sm w-[100px]">{series.name}</h1>
        </div>
      ));

  useEffect(() => {
    setLoading(true);
    const getGenreList = async () => {
      const response = await moviesApiRequest.get("/genre/tv/list");
      setGenreList(response.data.genres);
      if (response.data.genres) {
        setLoading(false);
      }
      // console.log(genreList);
    };
    getGenreList();
  }, []);

  return (
    <div className="text-white">
      <Header />
 
      
          <div className="p-[1rem] grid grid-cols-3 lg:grid-cols-5 midi:grid-cols-4 gap-3">
            {genreList.map((genre) => (
              <p
                key={genre.id}
                className="cursor-pointer lg:w-[120px] min-w-[100px] text-center text-[14px] border border-dotted border-white rounded-md p-[5px] hover:bg-bodyBg hover:text-textCol transition-all duration-700 ease-in-out"
                onClick={() => handleGetGenre(genre.id)}
              >
                {genre.name}
              </p>
            ))}
          </div>
          <h1 className="mt-3 text-center font-extrabold text-white tracking-widest">
            {genreName}
          </h1>
          {loading ? (
        <div className="flex items-center justify-center mt-[100px]">
          <img src={loader} alt="" width="50px" />
        </div>
      ) : (  <div>
          {tvList[0]?.length > 0 ? (
            <>
              <div className="grid grid-cols-3 midi:grid-cols-4 tab:grid-cols-4 lg:grid-cols-5 gap-4 mt-[1rem] p-[2rem]">
                {displayMovies}
              </div>
              <div className="mb-5">
                <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={"paginationButtons"}
                  previousLinkClassName={"previousButton"}
                  nextLinkClassName={"nextButton"}
                  activeLinkClassName={"paginationActive"}
                  disabledClassName={"paginationDisabled"}
                />
              </div>
            </>
          ) : (
            <p className="text-textCol text-center p-3 text-sm">
              No results found yet, click to select a genre.
            </p>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default TV;
