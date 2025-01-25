import { useNavigate, Link } from "react-router-dom";
import useGetPosts from "../hooks/useGetPosts";
import { Table, Form, ButtonGroup, Button } from "react-bootstrap";

import { PostStatusType } from "../types/index";

interface PostListProps {
  selectedPostStatus: PostStatusType;
}

const PostList = ({ selectedPostStatus }: PostListProps) => {
  const navigation = useNavigate();
  const { isLoading, data, isError, error } = useGetPosts(selectedPostStatus);

  if (isLoading) {
    return <p>loading please wait</p>;
  }

  if (isError) {
    return <div>error: {error.message}</div>;
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
        {data?.map((el, idx) => (
          <tr key={el.id}>
            <td>{++idx}</td>
            <td>
              <Link to="/info">{el.title}</Link>
            </td>
            <td>{el.status}</td>
            <td style={{ textAlign: "center" }}>
              <Form.Check // prettier-ignore
                type="switch"
                onChange={() => console.log("")}
                checked={el.topRate}
              />
            </td>
            <td>
              <ButtonGroup aria-label="Basic example">
                <Button variant="success" onClick={() => navigation("/edit")}>
                  Edit
                </Button>
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
