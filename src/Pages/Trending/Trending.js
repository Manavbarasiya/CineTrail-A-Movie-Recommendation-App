import { useState, useEffect } from "react";
import SingleContent from "../../components/Header/SingleContent/SingleContent";
import "./Trending.css";
import CustomPagination from "../../components/Pagination/CustomPagination";
import Shimmer from "../../components/Shimmer"; // Import Shimmer component

const Trending = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZmRkMjk4OTg2ZWQxYzZkZGU4N2U4ZGFhNmY4MWNmZiIsIm5iZiI6MTcyOTc4ODgwNi4wOTQxNiwic3ViIjoiNjcxOTUxMmY1YmU5ZTg3NTlkYTZjM2JlIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.wSohEDX0LkcgUtGpwUKBc4tC2SvLM-oNM-VCBw-YLLs",
      },
    };

    const fetchTrending = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/all/day?page=${page}`,
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

    fetchTrending();
  }, [page]);

  return (
    <div>
      <span className="pagetitle">Trending</span>
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
                title={c.title || c.name}
                date={c.release_date || c.first_air_date}
                media_type={c.media_type}
                vote_average={c.vote_average}
              />
            ))}
        </div>
      )}
      <CustomPagination setPage={setPage} numOfPages={numOfPages} />
    </div>
  );
};

export default Trending;
