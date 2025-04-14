import {
  Button,
  Tab,
  Tabs,
  TextField,
  Grid,
  Box,
  Container,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { React_APP_API_KEY } from "../../config/config";
import SingleContent from "../../components/Header/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import Shimmer from "../../components/Shimmer";
import "./Search.css";

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
  const [searchInitiated, setSearchInitiated] = useState(false);

  const moodToMovie = {
    happy: ["The Princess Bride", "La La Land", "Singin' in the Rain", "Clueless", "Mean Girls"],
    sad: ["Schindler's List", "The Pursuit of Happyness", "Requiem for a Dream", "Atonement"],
    romantic: ["Titanic", "The Notebook", "Pride & Prejudice", "La La Land"],
    thriller: ["Inception", "Shutter Island", "Se7en", "Fight Club", "Gone Girl"],
    action: ["Mad Max: Fury Road", "The Dark Knight", "Gladiator", "John Wick", "Die Hard"]
  };

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
    setLoading(true);
    setSearchInitiated(true);

    if (searchText) {
      let movieSuggestions = [];

      Object.keys(moodToMovie).forEach((mood) => {
        if (searchText.toLowerCase().includes(mood)) {
          movieSuggestions = moodToMovie[mood];
        }
      });

      if (movieSuggestions.length > 0) {
        setContent(movieSuggestions.map((title, index) => ({
          id: index,
          original_title: title,
          name: title,
          vote_average: 8,
          release_date: "N/A",
          first_air_date: "N/A",
          poster_path: null,
        })));
        setNumOfPages(1);
      } else {
        const apiUrl =
          type === 0
            ? `https://api.themoviedb.org/3/search/movie?api_key=${React_APP_API_KEY}&query=${searchText}&page=${page}`
            : `https://api.themoviedb.org/3/search/tv?api_key=${React_APP_API_KEY}&query=${searchText}&page=${page}`;

        try {
          const response = await fetch(apiUrl, options);
          const data = await response.json();
          setContent(data.results);
          setNumOfPages(data.total_pages);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    if (searchText) {
      fetchData();
    }
    // eslint-disable-next-line
  }, [type, page]);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Box mt={4} mb={2}>
          <Typography variant="h4" align="center" gutterBottom>
            Search Movies or TV Shows
          </Typography>
          <Box display="flex" gap={2} mt={2}>
            <TextField
              fullWidth
              label="Search"
              variant="filled"
              onChange={(e) => setSearchText(e.target.value)}
              InputProps={{ style: { color: "#fff" } }}
              InputLabelProps={{ style: { color: "#fff" } }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={fetchData}
              sx={{ height: "56px", minWidth: "56px" }}
            >
              <SearchIcon />
            </Button>
          </Box>
          <Tabs
            value={type}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
            sx={{ marginTop: 3 }}
          >
            <Tab label="Movies" />
            <Tab label="TV Series" />
          </Tabs>
        </Box>

        {loading ? (
          <Shimmer />
        ) : (
          <>
            <Grid container spacing={2} justifyContent="center">
              {content.map((c, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <SingleContent
                    id={c.id}
                    poster={c.poster_path}
                    title={type === 0 ? c.original_title : c.name}
                    date={type === 0 ? c.release_date : c.first_air_date}
                    media_type={type === 0 ? "movie" : "tv"}
                    vote_average={c.vote_average}
                  />
                </Grid>
              ))}
            </Grid>

            {searchInitiated && searchText && content.length === 0 && (
              <Typography
                variant="h6"
                color="textSecondary"
                align="center"
                sx={{ mt: 4 }}
              >
                {type ? "No series found." : "No movies found."}
              </Typography>
            )}
          </>
        )}

        {numOfPages > 1 && (
          <Box mt={4}>
            <CustomPagination setPage={setPage} numOfPages={numOfPages} />
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default Search;
