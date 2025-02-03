import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useGetPosts from "../hooks/useGetPosts";
import useSearch from "../hooks/useSearch";
import { fetchPosts } from "../hooks/useGetPosts";
import useUpdateRate from "../hooks/useUpdateRate";
import { PostStatusType } from "../types";
import { Table, Form, ButtonGroup, Button } from "react-bootstrap";
interface PostListProps {
  selectedPostStatus: PostStatusType;
  searchQuery: string;
}
const PostList = ({ selectedPostStatus, searchQuery }: PostListProps) => {
  const [paginate, setPaginate] = useState(1);

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error, isStale, refetch } = useGetPosts(
    selectedPostStatus,
    paginate
  );

  const searchData = useSearch(searchQuery);

  const updateRate = useUpdateRate();

  useEffect(() => {
    const nextPage = paginate + 1;
    if (nextPage > 3) return;
    queryClient.prefetchQuery({
      queryKey: ["posts", { paginate: nextPage, selectedStatus: "all" }],
      queryFn: () => fetchPosts("all", nextPage),
    });
  }, [paginate, queryClient]);

  if (isLoading || searchData.isLoading) {
    return <div>loading please wait</div>;
  }

  if (isError) {
    <div>error: {error.message}</div>;
  }

  if (searchData.isError) {
    <div>error: {searchData.error.message}</div>;
  }

  return (
    <>
      {isStale && searchQuery.length === 0 && (
        <Button onClick={() => refetch()} className="mb-3">
          Update Data
        </Button>
      )}
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
                  <Link to={`/info?id=${el.id}&type=paginate&key=${paginate}`}>
                    {el.title}
                  </Link>
                </td>
                <td>{el.status}</td>
                <td style={{ textAlign: "center" }}>
                  <Form.Check
                    type="switch"
                    checked={el.topRate}
                    disabled={selectedPostStatus !== "all"}
                    onChange={(e) =>
                      updateRate.mutate({
                        postId: el.id,
                        rateValue: e.target.checked,
                        pageNumber: paginate,
                      })
                    }
                  />
                </td>
                <td>
                  <ButtonGroup aria-label="Basic example">
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
                  <Link to={`/info?id=${el.id}&type=search&key=${searchQuery}`}>
                    {el.title}
                  </Link>
                </td>
                <td>{el.status}</td>
                <td style={{ textAlign: "center" }}>
                  <Form.Check
                    type="switch"
                    checked={el.topRate}
                    disabled={searchQuery.length > 0}
                  />
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
      {searchQuery.length === 0 && selectedPostStatus === "all" && (
        <ButtonGroup aria-label="Basic example">
          <Button variant="light" onClick={() => setPaginate(1)}>
            1
          </Button>
          <Button variant="light" onClick={() => setPaginate(2)}>
            2
          </Button>
          <Button variant="light" onClick={() => setPaginate(3)}>
            3
          </Button>
        </ButtonGroup>
      )}
    </>
  );
};

export default PostList;
