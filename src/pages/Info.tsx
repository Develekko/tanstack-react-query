import { useSearchParams } from "react-router-dom";
import useGetPost from "../hooks/useGetPost";
import React from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import useAddComment from "../hooks/useAddComment";
import useGetComments from "../hooks/useGetComments";
const Info = () => {
  const [searchParam] = useSearchParams();
  const [comment, setComment] = React.useState("");
  const id = searchParam.get("id") as string;

  const { data, isLoading, isError, error } = useGetPost({ id });
  const comments = useGetComments({ id });
  const addComment = useAddComment();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(comment);
    addComment.mutate({
      body: comment,
      post_id: +id
    }, {
      onSuccess: (data) => {
        console.log("data", data)
        comments.refetch();
        setComment("")
      },
      onError: (error) => {
        console.log("error", error)
      }
    })
  };
  return (
    <div>
      <h4>Title:{data?.title}</h4>
      <p>Status:{data?.status}</p>
      <p>Top Rate:{data?.topRate?"true":"false"}</p>
      <p>Body:{data?.body}</p>
      <hr />
      <h4 className="mb-2">Comments:</h4>
      <Form className="mb-2" onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={comment.length === 0 || addComment.isPending}>
          Submit
        </Button>

      </Form>

      {comments.isLoading ? <Spinner/> : null}
      {comments.isError ? <div>Error: {comments.error.message}</div> : null}
      {comments?.data?.map((ele) => {
        return <div key={ele?.id} className="border border-1 p-2 mb-2">
          <p>#{ele.id}</p>
          <p>{ele.body}</p>
          <p>Post ID: {ele.post_id}</p>
        </div>
      })}
    </div>
  );
};

export default Info;
