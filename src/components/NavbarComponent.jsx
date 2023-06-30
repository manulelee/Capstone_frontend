import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavbarComponent() {
  return (
    <Navbar expand="lg" data-bs-theme="dark" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand id="title" href="/">
          🏝️ Rent and ride
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/forecast">Forecast</Nav.Link>
            <NavDropdown title="Categories" id="basic-nav-dropdown">
              <NavDropdown.Item href="/categories/surf">Surf</NavDropdown.Item>
              <NavDropdown.Item href="/categories/windsurf">Windsurf</NavDropdown.Item>
              <NavDropdown.Item href="/categories/kitesurf">Kitesurf</NavDropdown.Item>
              <NavDropdown.Item href="/categories/wakeboard">Wakeboard</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
