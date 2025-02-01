import { Form } from "react-bootstrap";
import { PostStatusType } from "../types";

interface PostFilterProps {
  selectedPostStatus: PostStatusType;
  setSelectedPostStatus: (value: PostStatusType) => void;
}

const PostFilter = ({
  selectedPostStatus,
  setSelectedPostStatus,
}: PostFilterProps) => {
  const onChangHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setSelectedPostStatus(e.target.value as PostStatusType);
  };

  return (
    <>
      <h5>Filter By Status</h5>
      <Form.Select value={selectedPostStatus} onChange={onChangHandler}>
        <option value="all">Select Status</option>
        <option value="publish">Publish</option>
        <option value="draft">Draft</option>
        <option value="block">Block</option>
      </Form.Select>
    </>
  );
};

export default PostFilter;
