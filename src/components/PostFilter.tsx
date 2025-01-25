import { Form } from "react-bootstrap";

const PostFilter = () => {
  return (
    <>
      <h5>Filter By Status</h5>
      <Form.Select>
        <option value="">Select Status</option>
        <option value="Publish">Publish</option>
        <option value="Draft">Draft</option>
        <option value="Blocked">Blocked</option>
      </Form.Select>
    </>
  );
};

export default PostFilter;
