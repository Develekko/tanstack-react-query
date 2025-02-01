import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import PostList from "../components/PostList";
import PostFilter from "../components/PostFilter";
import { PostStatusType } from "../types";
const Home = () => {
  const [selectedPostStatus, setSelectedPostStatus] =
    useState<PostStatusType>("all");

  return (
    <Row>
      <Col xs={9}>
        <PostList selectedPostStatus={selectedPostStatus} />
      </Col>
      <Col>
        <PostFilter
          selectedPostStatus={selectedPostStatus}
          setSelectedPostStatus={setSelectedPostStatus}
        />
      </Col>
    </Row>
  );
};

export default Home;
