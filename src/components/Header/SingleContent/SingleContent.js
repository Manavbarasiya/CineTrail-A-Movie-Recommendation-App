import { img_300 } from "../../../config/config";
import { unavailable } from "../../../config/config";
import ContentModal from "../../ContentModal/ContentModal";
import "./SingleContent.css";
import Badge from '@mui/material/Badge';

const SingleContent = ({ id, poster, media_type, vote_average, title, date }) => {
  return (
    <ContentModal media_type={media_type} id={id}>
      <Badge badgeContent={vote_average} color={vote_average>6?"primary":"secondary"} className="vote_average" />
      <img className="poster" src={poster ? `${img_300}${poster}` : unavailable} alt={title} />
      <b className="title">{title}</b>
      <div className="date-media">
        <span className="subTitle">{media_type === "tv" ? "TV Series" : "Movie"}</span>
        <span className="subTitle">{date}</span>
      </div>
    </ContentModal>
  );
};

export default SingleContent;
