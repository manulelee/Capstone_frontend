import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setProfile } from "../redux/actions";
import NewEquipmentComponent from "./NewEquipmentComponent";
import { AiOutlineUser } from "react-icons/ai";

function NavbarComponent() {
  const profile = useSelector((state) => state.profile);
  const isUser = profile.roles.length === 1;
  const isAdmin = profile.roles.length >= 2;
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(setProfile({ id: "", username: "", email: "", password: "", firstname: "", lastname: "", roles: [] }));
  };

  return (
    <Navbar expand="lg" data-bs-theme="dark" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand id="title">🏝️ Rent and ride</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto d-flex justify-content-between w-100">
            <span className="d-flex ">
              <Link to="/" className="text-decoration-none">
                <div className="nav-link me-2">Home</div>
              </Link>
              <NavDropdown title="Categories" id="basic-nav-dropdown">
                <Link to="/categories/surf" className="text-decoration-none">
                  <div className="nav-link mx-lg-auto">Surf</div>
                </Link>

                <Link to="/categories/windsurf" className="text-decoration-none">
                  <div className="nav-link mx-lg-auto">Windsurf</div>
                </Link>

                <Link to="/categories/kitesurf" className="text-decoration-none">
                  <div className="nav-link mx-lg-auto">Kitesurf</div>
                </Link>

                <Link to="/categories/wakeboard" className="text-decoration-none">
                  <div className="nav-link mx-lg-auto">Wakeboard</div>
                </Link>
              </NavDropdown>
            </span>
            <span className="d-flex me-5 pe-3">
              <>
                <NavDropdown
                  title={
                    <>
                      {profile.username} &nbsp;
                      <AiOutlineUser />
                    </>
                  }
                  className="me-5 d-flex align-items-center text-decoration-none"
                >
                  {!profile.username && (
                    <Link to={"/login"} className="text-decoration-none">
                      <div className="dropdown-item btn btn-success ">Login</div>
                    </Link>
                  )}
                  {profile.username && (
                    <div className="dropdown-item btn btn-danger" onClick={() => logout()}>
                      Logout
                    </div>
                  )}
                  {isAdmin && (
                    <>
                      <NavDropdown.Divider />
                      <Link to={"/allBookings"} className="text-decoration-none">
                        <div className="dropdown-item ">Prenotazioni</div>
                      </Link>
                      <NewEquipmentComponent />
                    </>
                  )}
                  {isUser && (
                    <>
                      <NavDropdown.Divider />
                      <Link to={"/bookings"} className="text-decoration-none">
                        <div className="dropdown-item">Prenotazioni</div>
                      </Link>
                    </>
                  )}
                </NavDropdown>
              </>
            </span>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
