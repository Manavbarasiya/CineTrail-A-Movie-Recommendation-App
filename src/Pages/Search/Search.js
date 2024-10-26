import { Button, Tab, Tabs, TextField } from "@mui/material";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { React_APP_API_KEY } from "../../config/config";
import SingleContent from "../../components/Header/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import Shimmer from "../../components/Shimmer"; // Assuming you have a Shimmer component
import "./Search.css"
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffffff",
    },
  },
});

const Search = () => {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchInitiated, setSearchInitiated] = useState(false); // New state for search initiation

  const handleChange = (event, newValue) => {
    setType(newValue);
    setPage(1);
  };

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZmRkMjk4OTg2ZWQxYzZkZGU4N2U4ZGFhNmY4MWNmZiIsIm5iZiI6MTcyOTc4ODgwNi4wOTQxNiwic3ViIjoiNjcxOTUxMmY1YmU5ZTg3NTlkYTZjM2JlIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.wSohEDX0LkcgUtGpwUKBc4tC2SvLM-oNM-VCBw-YLLs",
    },
  };

  const fetchData = async () => {
    console.log("fetchData triggered");
    if (searchText) {
      setLoading(true);
      setSearchInitiated(true); // Set search initiated to true when fetching data
      const apiUrl =
        type === 0
          ? `https://api.themoviedb.org/3/search/movie?api_key=${React_APP_API_KEY}&query=${searchText}&page=${page}`
          : `https://api.themoviedb.org/3/search/tv?api_key=${React_APP_API_KEY}&query=${searchText}&page=${page}`;

      try {
        const response = await fetch(apiUrl, options);
        const data = await response.json();
        console.log("herein search");
        console.log(data.results);

        setContent(data.results);
        setNumOfPages(data.total_pages);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          margin: "15px 0",
        }}
      >
        <div className="aligning" style={{ width: "100%" }}>
          <div
            className="searches"
            style={{ display: "flex", margin: "15px 0" }}
          >
            <TextField
              style={{ flex: 1 }}
              className="searchBox"
              label="Search"
              onChange={(e) => setSearchText(e.target.value)}
              variant="filled"
              InputProps={{
                style: { color: "#ffffff" },
              }}
              InputLabelProps={{
                style: { color: "#ffffff" },
              }}
            />
            <Button
              variant="contained"
              style={{ marginLeft: 10, height: "56px" }} // Match height with TextField
              onClick={fetchData}
            >
              <SearchIcon />
            </Button>
          </div>

          <Tabs
            value={type}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            style={{ marginTop: 10, width: "100%" }} // Ensure full width
          >
            <Tab
              style={{ flex: 1, textAlign: "center", minWidth: "0" }}
              label="Search Movies"
            />
            <Tab
              style={{ flex: 1, textAlign: "center", minWidth: "0" }}
              label="Search TV Series"
            />
          </Tabs>
        </div>

        {loading ? (
          <Shimmer />
        ) : (
          <div className="trending">
            {content.map((c) => (
              <SingleContent
                key={c.id}
                id={c.id}
                poster={c.poster_path}
                title={type === 0 ? c.original_title : c.name} // Check for movie or TV show title
                date={type === 0 ? c.release_date : c.first_air_date} // Check for movie or TV show date
                media_type={type === 0 ? "movie" : "tv"} // Set media_type based on type
                vote_average={c.vote_average}
              />
            ))}
            {searchInitiated &&
              searchText &&
              content.length === 0 &&
              (type ? <h2>No series found</h2> : <h2>No Movies found</h2>)}
          </div>
        )}

        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      </div>
    </ThemeProvider>
  );
};

export default Search;
