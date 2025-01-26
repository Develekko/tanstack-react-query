import { useNavigate, Link } from "react-router-dom";
import useGetPosts from "../hooks/useGetPosts";
import useSearch from "../hooks/useSearch";

import { PostStatusType } from "../types/index";
import { Table, Form, ButtonGroup, Button } from "react-bootstrap";

interface PostListProps {
  selectedPostStatus: PostStatusType;
  searchQuery: string;
}

const PostList = ({ selectedPostStatus, searchQuery }: PostListProps) => {
  const navigation = useNavigate();
  const { isLoading, data, isError, error, isStale, refetch } =
    useGetPosts(selectedPostStatus);
  const searchData = useSearch(searchQuery);

  if (isLoading || searchData.isLoading) {
    return <p>loading please wait</p>;
  }

  if (isError) {
    return <div>error: {error.message}</div>;
  }

  if (searchData.error) {
    return <div>error: {searchData.error.message}</div>;
  }

  return (
    <>
      {isStale && searchQuery.length === 0 ? (
        <Button onClick={() => refetch()} className="mb-3">
          Update Data
        </Button>
      ) : null}
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
          {searchQuery.length === 0 &&
            data?.map((el, idx) => (
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
                    <Button
                      variant="success"
                      onClick={() => navigation("/edit")}
                    >
                      Edit
                    </Button>
                    <Button variant="danger">Delete</Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}

          {searchQuery.length > 0 &&
            searchData.data?.map((el, idx) => (
              <tr key={el.id}>
                <td>{++idx}</td>
                <td>
                  <Link to="/info">{el.title}</Link>
                </td>
                <td>{el.status}</td>
                <td style={{ textAlign: "center" }}>
                  <Form.Check
                    type="switch"
                    onChange={() => console.log("")}
                    checked={el.topRate}
                  />
                </td>
                <td>
                  <ButtonGroup aria-label="Basic example">
                    <Button
                      variant="success"
                      onClick={() => navigation("/edit")}
                    >
                      Edit
                    </Button>
                    <Button variant="danger">Delete</Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default PostList;
