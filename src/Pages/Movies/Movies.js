import { useState, useEffect } from "react";
import SingleContent from "../../components/Header/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import Shimmer from "../../components/Shimmer"; // Import Shimmer component
import Genres from "../../components/Genres";
import { React_APP_API_KEY } from "../../config/config";
import useGenres from "../../hooks/useGenres";
const Movies = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();
  const [loading, setLoading] = useState(true); // Add loading state
  const [selectedGenres, setSelectedGenres] = useState();
  const [genres,setGenres] = useState();
  const genreForURL=useGenres(selectedGenres);
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZmRkMjk4OTg2ZWQxYzZkZGU4N2U4ZGFhNmY4MWNmZiIsIm5iZiI6MTcyOTc4ODgwNi4wOTQxNiwic3ViIjoiNjcxOTUxMmY1YmU5ZTg3NTlkYTZjM2JlIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.wSohEDX0LkcgUtGpwUKBc4tC2SvLM-oNM-VCBw-YLLs"
          },
    };

    const fetchMovies = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${React_APP_API_KEY}&language=en-US&sort_by=popularity.desc&page=${page}&with_genres=${genreForURL}
`,
          options
        );
        const data = await response.json();
        setContent(data.results);
        setNumOfPages(data.total_pages);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, [page,genreForURL]);

  return (
    <div>
      <span className="pagetitle">Movies</span>
        <Genres type="movie" selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} genres={genres} setGenres={setGenres} setPage={setPage}/>
      
      {loading ? ( // Display shimmer when loading is true
        <Shimmer />
      ) : (
        <div className="trending">
          {content &&
            content.map((c) => (
              <SingleContent
                key={c.id}
                id={c.id}
                poster={c.poster_path}
                title={c.title}
                date={c.release_date}
                media_type="movie"
                vote_average={c.vote_average}
              />
            ))}
        </div>
      )}
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Movies;
