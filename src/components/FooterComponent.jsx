import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function FooterComponent() {
  return (
    <footer className="bg-dark text-light mt-5">
      <Container className="text-left">
        <Row>
          <Col md="6">
            <h5 className="mb-4 mt-3 ">Contatti:</h5>
            <p>
              <span className="fw-bold">Telefono:</span> +39 348345987 <br />
              <span className="fw-bold">Email:</span>{" "}
              <Link to="mailto:info@rentandride.com" target="_blank" className="text-decoration-none text-light">
                info@rentandride.com
              </Link>{" "}
              <br />
            </p>
          </Col>
          <hr className="clearfix w-100 d-md-none" />
          <Col md="2">
            <h5 className="mb-4 mt-3 ">Condizioni</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="#" className="text-decoration-none text-light">
                  Termini e condizioni
                </Link>
              </li>
            </ul>
          </Col>
          <hr className="clearfix w-100 d-md-none" />
          <Col md="2">
            <h5 className="mb-4 mt-3">About us</h5>
            <ul className="list-unstyled">
              <li>
                <Link
                  to="https://www.linkedin.com/in/emanuele-syrbe-024a1626b/"
                  className="text-decoration-none text-light"
                  target="_blank"
                >
                  Emanuele Syrbe
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
      <hr />
      <div className=" text-center pb-3">
        <Container fluid>
          &copy; {new Date().getFullYear()} Copyright{" "}
          <Link
            to="https://www.linkedin.com/in/emanuele-syrbe-024a1626b/"
            className="text-decoration-none text-light"
            target="_blank"
          >
            Emanuele Syrbe
          </Link>
        </Container>
      </div>
    </footer>
  );
}

export default FooterComponent;
