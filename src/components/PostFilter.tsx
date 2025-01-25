import { Form } from "react-bootstrap";
import { PostStatusType } from "../types/index";

interface PostFilterProps {
  selectedPostStatus: PostStatusType;
  setSelectedPostStatus: (value: PostStatusType) => void;
}
const PostFilter = ({
  selectedPostStatus,
  setSelectedPostStatus,
}: PostFilterProps) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPostStatus(e.target.value as PostStatusType);
  };

  return (
    <>
      <h5>Filter By Status</h5>
      <Form.Select value={selectedPostStatus} onChange={onChangeHandler}>
        <option value="all">All</option>
        <option value="publish">Publish</option>
        <option value="draft">Draft</option>
        <option value="block">Blocked</option>
      </Form.Select>
    </>
  );
};

export default PostFilter;
