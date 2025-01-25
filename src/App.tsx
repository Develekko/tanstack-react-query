import {
  Container,
  Nav,
  Navbar,
  Table,
  Row,
  Col,
  Form,
  ButtonGroup,
  Button,
} from "react-bootstrap";

function App() {
  return (
    <Container>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">React-Query</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#home">New Post</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Row className="mt-5">
        <Col xs={9}>
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
              <tr>
                <td>1</td>
                <td>lurem ipsum dollar asd sad asdas dsa dsa dsad asdasd</td>
                <td>Otto</td>
                <td style={{ textAlign: "center" }}>
                  <Form.Check type="checkbox" />
                </td>
                <td>
                  <ButtonGroup aria-label="Basic example">
                    <Button variant="success">Edit</Button>
                    <Button variant="danger">Delete</Button>
                  </ButtonGroup>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col>
          <h5>Filter By Status</h5>
          <Form.Select>
            <option value="">Select Status</option>
            <option value="Publish">Publish</option>
            <option value="Draft">Draft</option>
            <option value="Blocked">Blocked</option>
          </Form.Select>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
