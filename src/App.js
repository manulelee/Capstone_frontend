import { Container } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeComponent from "./components/HomePageComponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import DetailsPage from "./components/DetailsPage";
import NavbarComponent from "./components/NavbarComponent";
import UserBookingComponent from "./components/UserBookingComponent";
import AllBookingComponent from "./components/AllBookingsComponent";
import EditEquipmentComponent from "./components/EditEquipmentComponent";
import CategoryPageComponent from "./components/CategoryPageComponent";

const App = () => {
  return (
    <Container fluid className="p-0">
      <div className="App">
        <BrowserRouter>
          <NavbarComponent />
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomeComponent />} />
            <Route path="/details/:id" element={<DetailsPage />} />
            <Route path="/categories/:category" element={<CategoryPageComponent />} />
            <Route path="/edit/:id" element={<EditEquipmentComponent />} />
            <Route path="/bookings" element={<UserBookingComponent />} />
            <Route path="/allBookings" element={<AllBookingComponent />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Container>
  );
};

export default App;
