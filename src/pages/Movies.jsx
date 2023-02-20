import React, { useEffect,useRef,  useState } from "react";
import axios from "axios";
import Card from "../components/Card";

const api_key = "?api_key=a050af4c5354d8e3d4d8d50330fb50d9";
const movieUrl = `https://api.themoviedb.org/3/discover/movie${api_key}&language=en-US`;
const genreUrl = `https://api.themoviedb.org/3/genre/movie/list${api_key}&language=en-US`;

const Movies = () => {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);

  const [genres, setGenres] = useState([]);
  const [selectGenres, setSelectGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const movie = useRef()

  useEffect(() => {
    const genre = selectGenres.join(",");
    const getMovies = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `${movieUrl}&with_genres=${genre}&page=${page}`
        );
        setItems(data.results);
        setTotalPage(data.total_pages);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
  }, [selectGenres, page]);

  useEffect(() => {
    try {
      const getGenres = async () => {
        const { data } = await axios.get(`${genreUrl}`);
        setGenres(data.genres);
      };
      getGenres();
    } catch (error) {}
  }, []);
  console.log(items);

  const handleGenreChange = (e) => {
    const value = e.target.value;
    const isGenre = e.target.checked;
    if (isGenre) {
      setSelectGenres([...selectGenres, value]);
    } else {
      const newSelectGenres = selectGenres.filter(
        (selectGenre) => selectGenre !== value
      );
      setSelectGenres(newSelectGenres);
    }
  };

  const pageIncrease = (e) => {
    e.preventDefault();
    if (page > totalPage) return setPage(1);
    setPage(page + 1);
    movie.current.scrollIntoView({ behavior: 'smooth' })

  };
  const pageDecrease = () => {
    if (page <= totalPage) return setPage(1);
    setPage(page - 1);
    movie.current.scrollIntoView({ behavior: 'smooth' })

  };
  return (
    <>
      <section className="browse-movie-by-filter">
        <div className="container">
          <div className="movie-filter">
            <div className="filter">
              <h2 className="heading">Filter</h2>
              <form action="">
                <div className="filter-options">
                  <div className="type genres">
                    <h5 className="title">With selected genres</h5>
                    <div className="genres-filter-group">
                      {genres.map((genre) => {
                        return (
                          <div
                            key={genre.name + genre.id}
                            className="form-control"
                          >
                            <input
                              type="checkbox"
                              name={genre.name}
                              id={genre.name}
                              value={genre.id}
                              onChange={handleGenreChange}
                            />
                            <label htmlFor={genre.name} id={genre.name}>
                              {genre.name}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div ref={movie} className="filtered-movie">
              <h2 className="heading">Browse</h2>
              {isLoading ? (
                <h3 style={{ textAlign: "center" }}>...Loading</h3>
              ) : (
                <div className="movies-card page-movies">
                  {items.length < 1 && <h3>No Items Found</h3>}
                  {items?.map((item) => {
                    return <Card key={item.id} {...item} />;
                  })}
                </div>
              )}

              <div className="pagination">
                <button
                  onClick={pageDecrease}
                  type="button"
                  className="btn prev"
                >
                  Prev
                </button>
                <button
                  onClick={pageIncrease}
                  type="button"
                  className="btn next"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Movies;
