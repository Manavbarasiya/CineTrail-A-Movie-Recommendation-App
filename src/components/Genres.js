import { useEffect } from "react";
import { React_APP_API_KEY } from "../config/config"; // Ensure this imports correctly
import { Chip } from "@mui/material";

const Genres = ({
  selectedGenres = [],
  type,
  setSelectedGenres,
  genres = [],
  setGenres,
  setPage,
}) => {
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]); // Fix array spread
    setGenres(genres.filter((g) => g.id !== genre.id)); // Proper filtering
    setPage(1);
  };
  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };

  useEffect(() => {
    const fetchGenres = async () => {
      const genreURL =
        type === "movie"
          ? "https://api.themoviedb.org/3/genre/movie/list?language=en"
          : "https://api.themoviedb.org/3/genre/tv/list?language=en";
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZmRkMjk4OTg2ZWQxYzZkZGU4N2U4ZGFhNmY4MWNmZiIsIm5iZiI6MTcyOTc4ODgwNi4wOTQxNiwic3ViIjoiNjcxOTUxMmY1YmU5ZTg3NTlkYTZjM2JlIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.wSohEDX0LkcgUtGpwUKBc4tC2SvLM-oNM-VCBw-YLLs",
        },
      };

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/${type}/list?language=en`,
          options
        );
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
    return () => {
      setGenres([]);
    };
  }, [type, setGenres]);
  // Fetch genres whenever the type changes

  return (
    <div className="genres" style={{ padding: "6px 0px" }}>
      {selectedGenres &&
        selectedGenres.map((genre) => (
          <Chip
            key={genre.id}
            label={genre.name} // Display the genre name
            clickable
            onDelete={() => handleRemove(genre)}
            color="primary"
          />
        ))}
      {genres &&
        genres.map((genre) => (
          <Chip
            key={genre.id}
            label={genre.name} // Display the genre name
            clickable
            style={{
              color: "black",
              backgroundColor: "white",
              margin: 2,
            }}
            onClick={() => handleAdd(genre)}
          />
        ))}
    </div>
  );
};

export default Genres;
