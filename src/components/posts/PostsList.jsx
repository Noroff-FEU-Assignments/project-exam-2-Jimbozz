import React, { useCallback, useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import useAxios from "../../hooks/useAxios";
import AlertError from "../common/AlertError";
import Loading from "../common/Loading";
import PostCard from "./PostCard";

export default function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const http = useAxios();

  const getPosts = useCallback(
    async () => {
      try {
        const response = await http.get(
          "social/posts/?_author=true&_comments=true&_reactions=true"
        );
        setPosts(response.data);
      } catch (error) {
        console.log(error);
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(
    () => {
      getPosts();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <AlertError>
        There was an error loading posts. Please reload the page or try again
        later.
      </AlertError>
    );
  }

  return (
    <Container>
      <Row xs={1} className="g-4">
        {posts.map((post) => {
          const {
            id,
            title,
            body,
            author,
            created,
            reactions,
            comments,
            media,
            tags,
          } = post;
          return (
            <Col key={id}>
              <PostCard
                key={id}
                id={id}
                title={title}
                body={body}
                author={author}
                created={created}
                reactions={reactions}
                comments={comments}
                media={media}
                tags={tags}
                getPosts={getPosts}
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
