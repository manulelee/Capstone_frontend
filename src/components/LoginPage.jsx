import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { getProfile } from "../redux/actions";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let loginDto = {
    username: "",
    password: "",
  };

  let token;

  const [pass, setPassword] = useState("");
  const [user, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    getToken(loginDto);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const getToken = async (loginDto) => {
    loginDto.username = user;
    loginDto.password = pass;
    setIsLoading(true);
    try {
      setIsError(false);
      let response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        body: JSON.stringify(loginDto),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        token = data.accessToken;
        dispatch(getProfile(data.username));
        localStorage.setItem("token", token);
        setIsLoading(false);
        navigate("/");
      } else {
        setIsError(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container fluid className="text-center mt-2 mb-3 page-container">
      <div className="py-5 my-5">
        <p className="">
          Benvenuto su Rent and Ride
          <br /> Effettua il login e prenota subito!
        </p>

        <Form onSubmit={handleSubmit} className="mt-5">
          <Form.Group className="mb-3 w-25 mx-auto" controlId="username" onChange={handleUsername}>
            <Form.Control required type="text" placeholder="insert username.." />
          </Form.Group>
          <Form.Group className="mb-3 w-25 mx-auto" controlId="password" onChange={handlePassword}>
            <Form.Control required type="password" placeholder="insert password.." />
          </Form.Group>

          <Button type="submit" className="btn btn-light btn-outline-warning my-2 w-25 ">
            Login
          </Button>
        </Form>

        <button
          type="button"
          className="btn btn-outline-success my-2 w-25 "
          onClick={() => {
            window.location.replace("/register");
          }}
        >
          Registrati
        </button>
        {isLoading && (
          <div className="w-100">
            <Spinner animation="border" role="status" variant="success" className="mx-auto">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        {isError && <p>Username o password errati</p>}
      </div>
    </Container>
  );
};
export default LoginPage;
