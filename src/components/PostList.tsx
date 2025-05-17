import { Link } from "react-router-dom";
import useGetPosts, { fetchPosts } from "../hooks/useGetPosts";
import { useIsFetching, useQueryClient } from "@tanstack/react-query";
import { Table, Form, ButtonGroup, Button, Spinner } from "react-bootstrap";
import { PostStatusType } from "../types";
import React, { useCallback, useEffect } from "react";
import { useUpdateRate } from "../hooks/useUpdateRate";
import useRemovePost from "../hooks/useRemovePost";
import axios from "axios";

interface PostListProps {
  selectedPostStatus: PostStatusType;
  searchQuery: string;
}

export default function PostList({ selectedPostStatus, searchQuery }: PostListProps) {
  const [totalCount, setTotalCount] = React.useState(0);
  const [paginate, setPaginate] = React.useState(1);
  const queryClient = useQueryClient();
  const updateRate = useUpdateRate();
  const deletePost = useRemovePost();
  const globalLoading = useIsFetching()
  const { data, isError, error, isStale, refetch } = useGetPosts({
    selectedPostStatus,
    searchQuery,
    paginate,
  });

  const fetchTotalCount = async () => {
  const response = await axios.get("http://localhost:5005/posts", {
      params: { _page: 1, _limit: 1 },
    });
    console.log(response.headers["x-total-count"]);
    return Number(response.headers["x-total-count"]);
  };

  const getCount = async () => {
    const count = await fetchTotalCount();
    console.log(count);
    setTotalCount(count);

    const totalPages = Math.max(1, Math.ceil(count / 5));
    if (paginate > totalPages) {
      setPaginate(totalPages);
    }
  };

  useEffect(() => {
    getCount();

    const nextPage = paginate + 1;
    queryClient.prefetchQuery({
      queryKey: ["posts", { selectedPostStatus, searchQuery, paginate: nextPage }],
      queryFn: () => fetchPosts({ selectedPostStatus, searchQuery, paginate: nextPage }),
      staleTime: 1000 * 10,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryClient, paginate]);

  const paginatedButtons = useCallback(() => {
    const buttons = [];
    const totalPages = Math.ceil(totalCount / 5);

    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <Button
          key={i}
          variant={i === paginate ? "primary" : "secondary"}
          onClick={() => setPaginate(i)}
        >
          {i}
        </Button>
      );
    }

    console.log(buttons)
    return buttons;
  }, [paginate, totalCount]);
  if (globalLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Button
        disabled={!(isStale && searchQuery.length === 0)}
        onClick={() => refetch()}
        className="bg-red-500"
      >
        Refresh
      </Button>
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
          {data?.map((ele, index) => {
            return (
              <tr key={index}>
                <td>{ele?.id}</td>
                <td>
                  <Link to={`/info?id=${ele?.id}`}>{ele?.title}</Link>
                </td>
                <td>{ele?.status}</td>
                <td style={{ textAlign: "center" }}>
                  <Form.Check
                    onChange={(e) =>
                      updateRate.mutate({
                        postId: ele?.id,
                        rateValue: e.target.checked,
                        pageNumber: paginate,
                        search: searchQuery,
                        filter: selectedPostStatus,
                      })
                    }
                    checked={ele?.topRate}
                    type="switch"
                  />
                </td>
                <td>
                  <ButtonGroup>
                    <Button
                      variant="danger"
                      onClick={() =>
                        deletePost.mutate(
                          {
                            postId: ele?.id,
                            pageNumber: paginate,
                            search: searchQuery,
                            filter: selectedPostStatus,
                          },
                          {
                            onSuccess: () => {
                              getCount(); // ✅ Recalculate total count
                              refetch();  // ✅ Refetch current page
                            },
                          }
                        )
                      }
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <ButtonGroup className="gap-2">{paginatedButtons()}</ButtonGroup>
    </>
  );
}
