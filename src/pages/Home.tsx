import { Row, Col } from "react-bootstrap";
import PostList from "../components/PostList";
const Home = () => {
  return (
    <Row>
      <Col xs={9}>
        <PostList />
      </Col>
      <Col></Col>
    </Row>
  );
};

export default Home;
