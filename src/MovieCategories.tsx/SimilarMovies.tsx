import React, { useState, useEffect } from "react";
import { moviesApiRequest } from "../utils/MovieApiRequest";
import { MovieItemType } from "../utils/Types";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

type SimilarProps = {
  id: string | undefined;
};

const SimilarMovies = ({ id }: SimilarProps) => {
  const [similarMovies, setSimilarMovies] = useState<MovieItemType[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const moviesPerPage = 10;
  const pagesVisited = pageNumber * moviesPerPage;
  const pageCount = Math.ceil(similarMovies.length / moviesPerPage);
  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
  };

  const displayMovies = similarMovies
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
        <h1 className="text-white text-sm w-[150px]">{movie.title}</h1>
      </div>
    ));
  const getSimilarMovies = async (): Promise<MovieItemType[]> => {
    const response = await (
      await moviesApiRequest.get(`/movie/${id}/similar`)
    ).data.results;
    setSimilarMovies(response);
    return response;
  };
  useEffect(() => {
    getSimilarMovies();
  });

  return (
    <div className="p-[1rem]">
      <div className="p-[1rem] border-b-[3px] border-b-red-500 pb-6">
        <h1 className="text-white font-bold tracking-wide  text-[20px]">
          Similar Movies
        </h1>
{   similarMovies.length > 0 ? ( <div>
   <div className="grid grid-cols-2 midi:grid-cols-4 tab:grid-cols-4 lg:grid-cols-5 gap-4 mt-[2rem]">
            {displayMovies}
          </div>
  
            <div className="my-5">
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
): <p className="text-textCol italic">No similar movies found.</p>}
    </div>
    </div> 
  );
};

export default SimilarMovies;
