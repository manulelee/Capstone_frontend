import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { AiOutlineCalendar } from "react-icons/ai";

function AllBookingComponent() {
  const [booking, setBooking] = useState([]);

  const getBookings = async () => {
    try {
      let response = await fetch(`http://localhost:8080/api/booking/all`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        setBooking(data);
      } else {
        console.log("Errore nella ricezione dei dati");
      }
    } catch (error) {
      console.log("ERRORE: " + error);
    }
  };

  useEffect(() => {
    getBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container>
        <h3 className="mt-3 mx-0">Lista prenotazioni:</h3>
        {booking
          .sort((a, b) => new Date(a.day) - new Date(b.day))
          .map((booking) => (
            <Row key={booking.id} className="border broder-dark rounded mt-4 py-2">
              <Col xs={12} md={3}>
                <img
                  src={booking.equipment.img}
                  alt={"Product " + booking.equipment.id + " image"}
                  onError={(event) =>
                    (event.target.src =
                      "https://cdn.icon-icons.com/icons2/1189/PNG/512/1490793840-user-interface33_82361.png")
                  }
                  className="w-100"
                />
              </Col>
              <Col xs={12} md={8}>
                <h2>
                  {booking.user.firstname} {booking.user.lastname}
                </h2>
                <span className="fw-bold">Brand: </span>
                {booking.equipment.brand} <br />
                <span className="fw-bold">Model: </span>
                {booking.equipment.model} <br />
                <span className="fw-bold">Data: </span>
                {booking.day.split("-")[0] + "/" + booking.day.split("-")[1] + "/" + booking.day.split("-")[2]}
                <br />
                <span className="fw-bold">Prezzo: </span> {booking.equipment.price} €
                <div className="d-flex justify-content-between">
                  <Button href={"mailto:" + booking.user.email} target="_blank" className="mt-3 btn-danger">
                    Contatta cliente
                  </Button>
                </div>
              </Col>
            </Row>
          ))}
      </Container>
    </>
  );
}

export default AllBookingComponent;
