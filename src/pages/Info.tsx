import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useGetPost from "../hooks/useGetPost";
import useAddComment from "../hooks/useAddComment";
import { Row, Col, Form, Button } from "react-bootstrap";
import useGetComments from "../hooks/useGetComments";
const Info = () => {
  const [comment, setComment] = useState("");

  const [searchParams] = useSearchParams();

  const id = searchParams.get("id") as string;
  const paramType = searchParams.get("type") as string;
  const paramKey = searchParams.get("key") as string;

  const { data, isLoading, error, isError } = useGetPost(
    id,
    paramType,
    paramKey
  );

  const getComments = useGetComments(id);

  const addComment = useAddComment();

  if (isLoading) {
    return <p>loading please wait</p>;
  }

  if (isError) {
    return <div>error: {error.message}</div>;
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addComment.mutate(
      { body: comment, post_id: +id },
      { onSuccess: () => setComment("") }
    );
  };

  return (
    <Row>
      <Col xs={6}>
        <div>
          <h4>Title: {data?.title}</h4>
          <p>Status: {data?.status}</p>
          <p>Top Rate: {data?.topRate ? "true" : "false"}</p>
          <p>Body: {data?.body}</p>
          <hr />
          <h4 className="mb-2">Comments:</h4>
          <Form className="mb-3" onSubmit={submitHandler}>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              disabled={addComment.isPending}
            >
              Submit
            </Button>
          </Form>
          {getComments.isLoading
            ? "loading please wait..."
            : getComments.data?.map((el) => <p key={el.id}>{el.body}</p>)}
        </div>
      </Col>
    </Row>
  );
};

export default Info;
