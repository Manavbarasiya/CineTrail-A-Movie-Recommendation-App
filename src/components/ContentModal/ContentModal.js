import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import YouTubeIcon from "@mui/icons-material/YouTube";
import "./ContentModal.css";
import Carousel from "./Carousel/Carousel";
import {
  img_500,
  React_APP_API_KEY,
  unavailable,
  unavailableLandscape,
} from "../../config/config";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%", // Adjusted to keep it responsive
  height: "80%", // Adjusted to keep it responsive
  bgcolor: "#39445a", // Using directly instead of backgroundColor from theme
  border: "1px solid #282c34",
  borderRadius: 10,
  color: "white",
  boxShadow: 24, // Directly use the shadow level
  p: 4, // Padding
};

export default function ContentModal({ children, media_type, id }) {
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState();
  const [video, setVideo] = React.useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const fetchData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZmRkMjk4OTg2ZWQxYzZkZGU4N2U4ZGFhNmY4MWNmZiIsIm5iZiI6MTcyOTgzOTcyNC40OTgwOSwic3ViIjoiNjcxOTUxMmY1YmU5ZTg3NTlkYTZjM2JlIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.CNguvbShNiehvX_a9-FX06jcIv5A8lu6U9yuxETWyfo",
      },
    };
    const url = `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${React_APP_API_KEY}`;
    try {
      const response = await fetch(url, options);
      const data = await response.json();

      setContent(data);
    } catch (error) {
      console.error("Error fetching content data:", error);
    }
  };
  const fetchVideo = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZmRkMjk4OTg2ZWQxYzZkZGU4N2U4ZGFhNmY4MWNmZiIsIm5iZiI6MTcyOTgzOTcyNC40OTgwOSwic3ViIjoiNjcxOTUxMmY1YmU5ZTg3NTlkYTZjM2JlIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.CNguvbShNiehvX_a9-FX06jcIv5A8lu6U9yuxETWyfo",
      },
    };
    const url = `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.React_APP_API_KEY}`;
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      // console.log(data);
      setVideo(data.results[0]?.key);
    } catch (error) {
      console.error("Error fetching content data:", error);
    }
  };
  React.useEffect(() => {
    fetchData();
    fetchVideo();
  }, []);
  return (
    <>
      <div className="media" onClick={handleOpen}>
        {children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {content && (
              <div className="ContentModal">
                <img
                  alt={content.name || content.title}
                  className="ContentModal__portrait"
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                />
                <div className="ContentModal__layout">
                  <span className="ContentModal__title">
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "..."
                    ).substring(0, 4)}
                    )
                  </span>
                  <div className="ContentModal__descriptionBox">
                    <span className="ContentModal__description">
                      {content.overview}
                    </span>
                  </div>
                  <div className="carouselContainer">
                    <Carousel media_type={media_type} id={id} />
                  </div>
                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                    className="Button"
                  >
                    Watch Trailer
                  </Button>
                </div>
              </div>
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
