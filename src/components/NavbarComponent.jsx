import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector } from "react-redux";

function NavbarComponent() {
  const profile = useSelector((state) => state.profile);
  const isUser = profile.roles.length == 1;
  const isAdmin = profile.roles.length >= 2;

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
            <NavDropdown title="Categories" id="basic-nav-dropdown">
              <NavDropdown.Item href="/categories/surf">Surf</NavDropdown.Item>
              <NavDropdown.Item href="/categories/windsurf">Windsurf</NavDropdown.Item>
              <NavDropdown.Item href="/categories/kitesurf">Kitesurf</NavDropdown.Item>
              <NavDropdown.Item href="/categories/wakeboard">Wakeboard</NavDropdown.Item>
            </NavDropdown>
            {isUser && (
              <Nav.Link className="mx-auto" href="/bookings">
                Le mie prenotazioni
              </Nav.Link>
            )}
            {isAdmin && (
              <NavDropdown className="mx-auto" title="Admin Board" id="basic-nav-dropdown">
                <NavDropdown.Item href="/allBooking">Prenotazioni</NavDropdown.Item>
                <NavDropdown.Item href="/addEquipment">Inserisci prodotto</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
