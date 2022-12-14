import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
import { format } from "date-fns";
import placeholderImage from "../../assets/profile-placeholder.png";
import EditPostButton from "./EditPostButton";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import CommentButton from "./CommentButton";
import ReactButton from "./ReactButton";

export default function PostCard({
  title,
  id,
  body,
  created,
  media,
  author,
  reactions,
  comments,
  symbol,
  getPosts,
  tags,
}) {
  const [auth] = useContext(AuthContext);
  const placeholder = placeholderImage;

  const onImageError = (event) => {
    event.target.onerror = null;
    event.target.style.display = "none";
  };

  return (
    <Card bg="dark" className="card-width" id={id}>
      <Card.Body>
        <div className="card-profile mb-3">
          <div className="card-profile-top">
            <div className="card-profile-top__user">
              <Card.Img
                className="card-profile-top__user-image"
                src={author.avatar ? author.avatar : placeholder}
                alt={author.name}
                onError={onImageError}
              />
            </div>
            <div className="card-profile-top__content">
              <Link className="card-link" to={`/profiles/${author.name}`}>
                <div className="card-profile-top__content--heading">
                  {author.name}
                </div>
              </Link>
              <small className="card-profile-top__content--date">
                {format(new Date(created), "d MMMM Y")}
              </small>
            </div>
          </div>
          {auth.name === author.name ? (
            <EditPostButton id={id} getPosts={getPosts} />
          ) : null}
        </div>
        <Link className="card-link" to={`/post/${id}/${title}`} key={id}>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{body}</Card.Text>
          <Card.Img
            src={media ? media : null}
            onError={(e) => (e.target.style.display = "none")}
          />
        </Link>
        <div className="d-flex card-tags">
          {tags.map((item, index) => {
            return (
              <Badge key={index} bg="info">
                {item}
              </Badge>
            );
          })}
        </div>
        <hr className="card-line"></hr>
        <div className="card-emoji">
          {reactions.map((item) => {
            return <div key={item.symbol}>{item.symbol}</div>;
          })}
        </div>
        <div className="d-flex gap-3">
          <ReactButton
            reactions={reactions.length}
            id={id}
            symbol={symbol}
            getPosts={getPosts}
          />
          <CommentButton
            comments={comments}
            id={id}
            key={id}
            title={title}
            body={body}
            author={author}
            created={created}
            reactions={reactions}
            media={media}
            getPosts={getPosts}
          />
        </div>
      </Card.Body>
    </Card>
  );
}

PostCard.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number,
  body: PropTypes.string,
  created: PropTypes.string,
  media: PropTypes.string,
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }),
};
