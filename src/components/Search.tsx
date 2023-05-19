import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { moviesApiRequest } from "../utils/MovieApiRequest";
import loader from "../assets/loaderImg.jpg";
import { MovieItemType } from "../utils/Types";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string | number>("");
  const [searchedMovies, setSearchedMovies] = useState<MovieItemType[]>([]);
  const [message, setMessage] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const moviesPerPage = 10;
  const pagesVisited = pageNumber * moviesPerPage;

  const pageCount = Math.ceil(searchedMovies.length / moviesPerPage);
  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
  };

  const displayMovies = searchedMovies
    .slice(pagesVisited, pagesVisited + moviesPerPage)
    .map((movie) => (
      <div className="flex flex-col gap-2" key={movie.id}>
        <Link to={`/movie/${movie.id}`}>
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt="No pic"
            width={150}
            className="h-[100px] object-cover rounded-lg hover:scale-110 cursor-pointer text-white"
          />
        </Link>
        <h1 className="text-white text-sm w-[100px]">{movie.title}</h1>
      </div>
    ));

  const handleSearch = async () => {
    if (searchTerm === "") {
      setMessage("Please enter a title.");
    } else {
      setLoading(true);
      try {
        const allMovies = await moviesApiRequest.get(
          `/search/movie?&query=${searchTerm}`
        );
        if (allMovies.data.results.length > 0) {
          setLoading(false);
          setSearchedMovies(allMovies.data.results);
        } else if (allMovies.data.total_results === 0) {
          setLoading(false);
          setSearchedMovies([]);
          setMessage(`No results found for "${searchTerm}".`);
        }
        console.log(allMovies);
      } catch (err) {
        console.log(err);
      }
    }
    // return allMovies;
  };

  return (
    <div className="h-auto ">
      <div className="flex gap-1 mt-[2rem] lg:gap-6">
        <div
          className="bg-white  w-[80%] lg:w-[400px] md:w-[400px] p-2  mx-[1rem]
        rounded-md gap-8 flex items-center"
        >
          <div>
            <FaSearch className="text-blue-900" />
          </div>
          <input
            name="search"
            type="text"
            placeholder="Search movie or TV series"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full -ml-4 outline-none text-darkBlue bg-none"
          />
        </div>
        <button
          className="bg-red-700 text-white p-2 cursor-pointer font-bold w-[100px] lg:w-[150px] rounded-md mr-[1rem] outline-none"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {loading ? (
        <div className="flex items-center justify-center mt-[100px]">
          <img src={loader} alt="" width="50px" />
        </div>
      ) : null}

      {searchedMovies.length > 0 ? (
        <div className="p-[1rem] border-b-[3px] border-b-red-500 pb-6">
          <h1 className="text-white font-bold tracking-wide  text-[20px]">
            Results
          </h1>
          <div className="grid grid-cols-3 midi:grid-cols-4 tab:grid-cols-4 lg:grid-cols-5 gap-4 mt-[2rem]">
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
        </div>
      ) : (
        <p className="text-red-600 p-[1rem] italic">{message}</p>
      )}
    </div>
  );
};

export default Search;
