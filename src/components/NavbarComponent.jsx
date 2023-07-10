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
        <Navbar.Brand id="title">Rent and ride</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto w-100">
            {/* Navbar lg */}
            <span className="d-none d-lg-flex justify-content-between w-100">
              <span className="d-flex ">
                <Link to="/" className="text-decoration-none">
                  <div className="nav-link me-2">Home</div>
                </Link>
                <NavDropdown title="Categorie" id="basic-nav-dropdown">
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
                        <div className="dropdown-item btn btn-transparent">Login</div>
                      </Link>
                    )}
                    {profile.username && (
                      <div className="dropdown-item btn btn-transparent" onClick={() => logout()}>
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
            </span>

            {/* Navbar mobile */}
            <span className="d-lg-none">
              <span>
                <Link to="/" className="text-decoration-none">
                  <div className="nav-link me-2">Home</div>
                </Link>

                <Link to="/categories/surf" className="text-decoration-none">
                  <div className="nav-link pt-0">Surf</div>
                </Link>

                <Link to="/categories/windsurf" className="text-decoration-none">
                  <div className="nav-link pt-0">Windsurf</div>
                </Link>

                <Link to="/categories/kitesurf" className="text-decoration-none">
                  <div className="nav-link pt-0">Kitesurf</div>
                </Link>

                <Link to="/categories/wakeboard" className="text-decoration-none">
                  <div className="nav-link pt-0">Wakeboard</div>
                </Link>
              </span>
              <span>
                <>
                  <div className="text-light d-flex align-items-center">
                    <AiOutlineUser /> &nbsp;
                    {profile.username || "Profilo"}
                  </div>
                  {!profile.username && (
                    <Link to={"/login"} className="text-decoration-none">
                      <div className="dropdown-item">Login</div>
                    </Link>
                  )}
                  {profile.username && (
                    <div className="dropdown-item nav-link text-decoration none" onClick={() => logout()}>
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
                </>
              </span>
            </span>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
