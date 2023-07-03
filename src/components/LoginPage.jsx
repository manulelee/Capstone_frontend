import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
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
    try {
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
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container fluid className="text-center p-0">
      <div className="py-5 bg-dark" style={{ display: "block", height: "100vh", vhposition: "initial" }}>
        <h2 id="title" className="text-light">
          Rent and Ride
        </h2>
        <p className="text-light">Welcome on Rent and Ride!</p>

        <Form onSubmit={handleSubmit} className="mt-5">
          <Form.Group className="mb-3 w-25 mx-auto" controlId="username" onChange={handleUsername}>
            <Form.Control required type="text" placeholder="insert username.." />
          </Form.Group>
          <Form.Group className="mb-3 w-25 mx-auto" controlId="password" onChange={handlePassword}>
            <Form.Control required type="password" placeholder="insert password.." />
          </Form.Group>
          <Button type="submit" className="btn btn-dark btn-outline-warning my-2 w-25 ">
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
          Register now!
        </button>
      </div>
    </Container>
  );
};
export default LoginPage;
