import { Link } from "react-router-dom";
import useGetPosts from "../hooks/useGetPosts";
import { Table, Form, ButtonGroup, Button } from "react-bootstrap";

const PostList = () => {
  const { data, isLoading, isError, error } = useGetPosts();

  if (isLoading) {
    return <div>loading please wait</div>;
  }

  if (isError) {
    <div>error: {error.message}</div>;
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Status</th>
          <th style={{ width: "10%" }}>Top Rate</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((el, idx) => (
          <tr>
            <td>{++idx}</td>
            <td>
              <Link to="/info">{el.title}</Link>
            </td>
            <td>{el.status}</td>
            <td style={{ textAlign: "center" }}>
              <Form.Check type="switch" checked={el.topRate} />
            </td>
            <td>
              <ButtonGroup aria-label="Basic example">
                <Button variant="danger">Delete</Button>
              </ButtonGroup>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PostList;
