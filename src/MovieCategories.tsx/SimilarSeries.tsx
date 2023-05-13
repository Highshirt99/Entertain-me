import React, { useState, useEffect } from "react";
import { moviesApiRequest } from "../utils/MovieApiRequest";
import { MovieItemType } from "../utils/Types";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

type SimilarProps = {
  id: string | undefined;
};

const SimilarSeries = ({ id }: SimilarProps) => {
  const [similarSeries, setSimilarSeries] = useState<MovieItemType[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const seriesPerPage = 10;
  const pagesVisited = pageNumber * seriesPerPage;
  const pageCount = Math.ceil(similarSeries.length / seriesPerPage);
  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
  };

  const displaySeries = similarSeries
    .slice(pagesVisited, pagesVisited + seriesPerPage)
    .map((series) => (
      <div className="flex flex-col gap-2" key={series.id}>
        <Link to={`/tv/${series.id}`}>
          <img
            src={`https://image.tmdb.org/t/p/original/${series.poster_path}`}
            alt="No pic"
            width={150}
            className="h-[100px] object-cover rounded-lg hover:scale-110 cursor-pointer text-white"
          />
        </Link>
        <h1 className="text-white text-sm w-[150px]">{series.name}</h1>
      </div>
    ));
  const getSimilarMovies = async (): Promise<MovieItemType[]> => {
    const response = await (
      await moviesApiRequest.get(`/tv/${id}/similar`)
    ).data.results;
    setSimilarSeries(response);
    return response;
  };
  useEffect(() => {
    getSimilarMovies();
  });

  return (
    <div className="p-[1rem]">
      <div className="p-[1rem] border-b-[3px] border-b-red-500 pb-6">
        <h1 className="text-white font-bold tracking-wide  text-[20px]">
          Similar Series
        </h1>
        {   similarSeries.length > 0 ? ( <div>
   <div className="grid grid-cols-2 midi:grid-cols-4 tab:grid-cols-4 lg:grid-cols-5 gap-4 mt-[2rem]">
            {displaySeries}
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
): <p className="text-textCol italic">No similar series found.</p>}
      </div>
    </div>
  );
};

export default SimilarSeries;