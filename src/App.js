import { Container } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeComponent from "./components/HomePageComponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import DetailsPage from "./components/DetailsPage";
import NavbarComponent from "./components/NavbarComponent";

const App = () => {
  return (
    <Container fluid className="p-0">
      <div className="App">
        <NavbarComponent></NavbarComponent>
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomeComponent />} />
            <Route path="/details/:id" element={<DetailsPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Container>
  );
};

export default App;
