import "./MovieList.css";
import Fire from "../../assets/fire.png";
import MovieCard from "./MovieCard";
import { useEffect, useState } from "react";

export default function MovieList() {
  const [movies, setMovies] = useState([]); //API로 받아온 영화 목록
  const [filterMovies, setFilterMovies] = useState([]);
  const [minRating, setMinRating] = useState(0);

  //한 번만 실행
  useEffect(() => {
    fetchMovies();
  }, []);

  //모든 영화 가져오기
  const fetchMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${
        import.meta.env.VITE_MOVIE_API_KEY
      }&language=ko`
    );
    const data = await response.json();
    setMovies(data.results); //영화 목록에 담기
    setFilterMovies(data.results);
  };

  // 평점보다 높은 영화들만 가져오기
  const handleFilter = (rate) => {
    if (minRating === rate) {
      setMinRating(0);
      setFilterMovies(movies);
    } else {
      setMinRating(rate);
      const filtered = movies.filter((movie) => movie.vote_average >= rate);
      setFilterMovies(filtered);
    }
  };
  return (
    <section className="movie_list">
      <header className="align_center movie_list_header">
        <h2 className="align_center movie_list_heading">
          인기순 <img src={Fire} alt="fire emoji" className="navbar_emoji" />
        </h2>

        <div className="align_center movie_list_fs">
          <ul className="align_center movie_filter">
            <li
              className={
                minRating === 8
                  ? "movie_filter_item active"
                  : "movie_filter_item"
              }
              onClick={() => handleFilter(8)}
            >
              8+ Star
            </li>
            <li
              className={
                minRating === 7
                  ? "movie_filter_item active"
                  : "movie_filter_item"
              }
              onClick={() => handleFilter(7)}
            >
              7+ Star
            </li>
            <li
              className={
                minRating === 6
                  ? "movie_filter_item active"
                  : "movie_filter_item"
              }
              onClick={() => handleFilter(6)}
            >
              6+ Star
            </li>
          </ul>

          <select name="" id="" className="movie_sorting">
            <option value="">SortBy</option>
            <option value="">Date</option>
            <option value="">Rating</option>
          </select>
          <select name="" id="" className="movie_sorting">
            <option value="">Ascending</option>
            <option value="">Descending</option>
          </select>
        </div>
      </header>
      <div className="movie_cards">
        {filterMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
        ;
      </div>
    </section>
  );
}
