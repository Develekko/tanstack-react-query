import { Row, Col } from "react-bootstrap";
import PostList from "../components/PostList";
import PostFilter from "../components/PostFilter";
import { useState } from "react";
import { PostStatusType } from "../types";
import SearchQuery from "../components/SearchQuery";
const Home = () => {
      const [selectedPostStatus, setselectedPostStatus] = useState<PostStatusType>('all')
      const [searchQuery, setSearchQuery] = useState<string>("")

  return (
    <Row>
      <Col xs={9}>
       <PostList selectedPostStatus={selectedPostStatus} searchQuery={searchQuery} />
      </Col>
      <Col>
       <SearchQuery searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
       <PostFilter selectedPostStatus={selectedPostStatus} setselectedPostStatus={setselectedPostStatus} />
      </Col>
    </Row>
  );
};

export default Home;
