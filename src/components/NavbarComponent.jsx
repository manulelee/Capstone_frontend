import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function NavbarComponent() {
  const profile = useSelector((state) => state.profile);
  const isUser = profile.roles.length === 1;
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
            <Link to="/" className="text-decoration-none">
              <div className="nav-link">Home</div>
            </Link>
            <NavDropdown title="Categories" id="basic-nav-dropdown">
              <NavDropdown.Item>
                <Link to="/categories/surf" className="text-decoration-none">
                  Surf
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/categories/windsurf" className="text-decoration-none">
                  Windsurf
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/categories/kitesurf" className="text-decoration-none">
                  Kitesurf
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/categories/wakeboard" className="text-decoration-none">
                  Wakeboard{" "}
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
            {isUser && (
              <Link to={"/bookings"} className="text-decoration-none">
                <div className="nav-link mx-lg-auto" to={"/bookings"}>
                  Prenotazioni
                </div>
              </Link>
            )}
            {isAdmin && (
              <NavDropdown className="mx-lg-auto" title="Admin Board" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <Link to="/allBookings" className="text-decoration-none">
                    Prenotazioni
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/addEquipment" className="text-decoration-none">
                    Inserisci prodotto
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
