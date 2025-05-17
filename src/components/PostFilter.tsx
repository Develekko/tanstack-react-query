import { Form } from "react-bootstrap";
import { PostStatusType } from "../types";

interface PostFilterProps {
    selectedPostStatus: PostStatusType;
    setselectedPostStatus: (value: PostStatusType) => void;
}

export default function PostFilter({ selectedPostStatus, setselectedPostStatus }: PostFilterProps) {

    const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setselectedPostStatus(e.target.value as PostStatusType);
    }
    return <>
        <h5>Filter By Status</h5>
        <Form.Select value={selectedPostStatus} onChange={onChangeHandler}>
            <option value="all">Select Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="blocked">Blocked</option>
        </Form.Select>
    </>
}
