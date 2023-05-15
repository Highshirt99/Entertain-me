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

const Movies = () => {
  let genreNm = "";
  const [genreName, setGenreName] = useState<string>("");
  const [genreList, setGenreList] = useState<GenreType[]>([]);
  const [moviesList, setMoviesList] = useState<MovieItemType[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [loading, setLoading] = useState(false);

  const moviesPerPage = 10;

  const pagesVisited = pageNumber * moviesPerPage;

  const pageCount = Math.ceil(moviesList[0]?.length / moviesPerPage);

  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
  };

  const movies: MovieItemType[] = [];

  const handleGetGenre = async (genre: number) => {
    setLoading(true);
    movies.length = 0;
    const upcomingMovies = (await moviesApiRequest.get("/movie/upcoming")).data
      .results;
    const trendingMovies = (await moviesApiRequest.get("/trending/movie/week"))
      .data.results;
    const popularMovies = (await moviesApiRequest.get("/movie/popular")).data
      .results;
    const nowPlaying = (await moviesApiRequest.get("/movie/now_playing")).data
      .results;

    if (upcomingMovies || trendingMovies || popularMovies || nowPlaying) {
      setLoading(false);
    }
    const upcomingMovieGenre = upcomingMovies.filter((movie: MovieItemType) =>
      movie.genre_ids?.includes(genre)
    );
    const trendingMovieGenre = trendingMovies.filter((movie: MovieItemType) =>
      movie.genre_ids?.includes(genre)
    );
    const nowPlayingMovieGenre = nowPlaying.filter((movie: MovieItemType) =>
      movie.genre_ids?.includes(genre)
    );
    const popularMovieGenre = popularMovies.filter((movie: MovieItemType) =>
      movie.genre_ids?.includes(genre)
    );

    const allMovies = upcomingMovieGenre.concat(
      trendingMovieGenre,
      popularMovieGenre,
      nowPlayingMovieGenre
    );

    movies.push(allMovies);
    genreList.forEach((item) => {
      if (item.id === genre) {
        genreNm = item.name;
        setGenreName(genreNm);
      }
    });
    setMoviesList(movies);
    return genre;
  };

  const displayMovies =
    moviesList.length > 0 &&
    moviesList[0]
      .slice(pagesVisited, pagesVisited + moviesPerPage)
      .map((movie: MovieItemType, index: number) => (
        <div className="flex flex-col gap-2" key={index}>
          <Link to={`/movie/${movie.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt="No pic"
              width={150}
              className="h-[100px] object-cover rounded-lg hover:scale-110 cursor-pointer text-white"
            />
          </Link>
          <h1 className="text-white text-sm w-[100px]">{movie.title}</h1>
        </div>
      ));

  useEffect(() => {
    setLoading(true);
    const getGenreList = async () => {
      const response = await moviesApiRequest.get("/genre/movie/list");
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
            className="cursor-pointer lg:w-[120px] min-w-[90px] text-center text-[14px] border border-dotted border-white rounded-md p-[5px] hover:bg-bodyBg hover:text-textCol transition-all duration-700 ease-in-out"
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
      ) : (
        <div>
          {moviesList[0]?.length > 0 ? (
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

export default Movies;
