import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Alert, Button, Container, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  let RegisterDto = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  };

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPassword] = useState("");
  const [user, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [show, setShow] = useState(false);
  const [relocate, setRelocate] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertHeading, setAlertHeading] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    register(RegisterDto);
  };

  const handleFirstName = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastName = (event) => {
    setLastName(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const register = async (RegisterDto) => {
    RegisterDto.firstname = firstName;
    RegisterDto.lastname = lastName;
    RegisterDto.username = user;
    RegisterDto.email = email;
    RegisterDto.password = pass;
    setIsError(false);
    setIsLoading(true);
    try {
      let response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        body: JSON.stringify(RegisterDto),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setAlertHeading("Resgistrazione");
        setAlertMsg("Utente registrato correttamente");
        setShow(true);
        setRelocate(true);
      } else {
        setIsLoading(false);
        setIsError(true);
      }
    } catch (error) {
      console.log("ERRORE: " + error);
    }
  };

  return (
    <Container fluid className="text-center mb-5 page-container">
      <div className="py-5 ">
        {show && (
          <Alert
            variant="light"
            onClose={() => {
              setShow(false);
              relocate && navigate("/login");
            }}
            dismissible
          >
            <Alert.Heading>{alertHeading}</Alert.Heading>
            <p>{alertMsg}</p>
          </Alert>
        )}
        <p>Nuovo utente? Registrati ora!</p>

        <Form onSubmit={handleSubmit} className="mt-5 mb-5">
          <Form.Group className="mb-3 w-25 mx-auto" controlId="firstName" onChange={handleFirstName}>
            <Form.Control type="text" required placeholder="insert first name.." />
          </Form.Group>
          <Form.Group className="mb-3 w-25 mx-auto" controlId="lastName" onChange={handleLastName}>
            <Form.Control type="text" required placeholder="insert last name.." />
          </Form.Group>
          <Form.Group className="mb-3 w-25 mx-auto" controlId="email" onChange={handleEmail}>
            <Form.Control type="email" required placeholder="insert email.." />
          </Form.Group>
          <Form.Group className="mb-3 w-25 mx-auto" controlId="username" onChange={handleUsername}>
            <Form.Control type="text" required placeholder="insert username.." />
          </Form.Group>
          <Form.Group className="mb-3 w-25 mx-auto" controlId="password" onChange={handlePassword}>
            <Form.Control type="password" required placeholder="insert password.." />
          </Form.Group>
          <Button type="submit" className="btn btn-light btn-outline-success my-2 w-25 ">
            Register
          </Button>
          {isLoading && (
            <div className="w-100">
              <Spinner animation="border" role="status" variant="success" className="mx-auto">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
          {isError && <p>Username o email già associata ad un account</p>}
        </Form>
      </div>
    </Container>
  );
}
export default RegisterPage;
