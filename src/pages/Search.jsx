import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { useQuery } from "../hooks/useQuery";
import Card from "../components/Card";
const Search = () => {
  const searchPage = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);
  const [searchMovie, setSearchMovie] = useState([]);
  const [error, setError] = useState("");

  let query = useQuery();
  const searchQuery = query.get("query").split(" ").join("+");
  const api_key = `?api_key=${process.env.REACT_APP_API_KEY}`;
  const searchUrl = `https://api.themoviedb.org/3/search/movie${api_key}&query=`;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);

        const { data } = await axios.get(
          `${searchUrl}${searchQuery}&page=${page}`
        );
        if (data.total_results > 0) {
          setSearchMovie(data.results);
          setTotalPage(data.total_pages);
          setIsLoading(false);
          setError("");
        } else {
          setError("No results found");
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        setError(error.response.data.errors[0]);
      }
    };
    fetchMovies();
  }, [searchQuery, page]);
  console.log(searchMovie);

  const pageIncrease = (e) => {
    e.preventDefault();
    if (page > totalPage) return setPage(1000);
    setPage(page + 1);
    searchPage.current.scrollIntoView({ behavior: "smooth" });
  };
  const pageDecrease = (e) => {
    e.preventDefault();
    if (page <= 1) return setPage(1);
    setPage(page - 1);
    searchPage.current.scrollIntoView({ behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <section>
        <div className="container">
          {isLoading && <h3 style={{ textAlign: "center" }}>...Loading</h3>}
        </div>
      </section>
    );
  }
  return (
    <>
      <section ref={searchPage} className="search">
        <div className="container">
          <div className="section-title">
            <h3>Movies</h3>
            <p style={{ marginBottom: "10px" }}>
              Search result for: <strong>"{query.get("query")}"</strong>{" "}
              {searchMovie.length} items Found
            </p>
          </div>
          <div className="movies-card">
            {error && <p>{error}</p>}
            {searchMovie?.map((movie) => {
              return <Card key={movie.id} {...movie} />;
            })}
          </div>
          {totalPage > 1 && (
            <div className="pagination">
              <button onClick={pageDecrease} type="button" className="btn prev">
                Prev
              </button>
              <button onClick={pageIncrease} type="button" className="btn next">
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Search;
