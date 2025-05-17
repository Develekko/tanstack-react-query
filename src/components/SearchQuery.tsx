import { Form } from "react-bootstrap"
interface SearchQueryProps {
    searchQuery: string
    setSearchQuery: (value: string) => void
}

export default function SearchQuery({ searchQuery, setSearchQuery }: SearchQueryProps) {
    const querySubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(searchQuery)
        setSearchQuery(searchQuery)
    }
  return <>
  <div className="mb-3">
    <h5>Search</h5>
    <Form onSubmit={querySubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            />
        </Form.Group>
        <button type="submit" className="btn btn-primary">
            Search
        </button>

    </Form>
  </div>
  </>
}
