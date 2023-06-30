import { Container } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "./components/NavbarComponent";
import HomeComponent from "./components/HomePageComponent";

const App = () => {
  return (
    <Container fluid className="p-0">
      <div className="App">
        <HomeComponent></HomeComponent>
      </div>
    </Container>
  );
};

export default App;
