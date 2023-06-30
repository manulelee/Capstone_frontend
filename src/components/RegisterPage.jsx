import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

function RegisterPage() {
  let RegisterDto = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  };
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPassword] = useState("");
  const [user, setUsername] = useState("");
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
    try {
      let response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        body: JSON.stringify(RegisterDto),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        window.location.replace("/login");
      }
    } catch (error) {
      console.log("ERRORE: " + error);
    }
  };

  return (
    <Container fluid className="text-center">
      <div className="py-5 bg-dark" style={{ display: "block", height: "100vh", vhposition: "initial" }}>
        <h2 id="title" className="text-light">
          Rent to Ride
        </h2>
        <p className="text-light">New user? Register now!</p>

        <Form onSubmit={handleSubmit} className="mt-5">
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
          <Button type="submit" className="btn btn-dark btn-outline-success my-2 w-25 ">
            Register
          </Button>
        </Form>
      </div>
    </Container>
  );
}
export default RegisterPage;
