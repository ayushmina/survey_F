import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navbarr() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/SurveyList">SurveyList</Nav.Link>
            <Nav.Link href="/SurveyListForResponse">SurveyListForResponse</Nav.Link>
            <Nav.Link href="/Response">Response</Nav.Link>

          </Nav>
        </Container>
      </Navbar>
      <br />

    </>
  );
}

export default Navbarr;