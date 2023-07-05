import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

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
      <Container className="p-0">
        <h3 className="mt-3 mx-0">Lista prenotazioni:</h3>
        {booking
          .sort((a, b) => new Date(a.day) - new Date(b.day))
          .map((booking) => (
            <Row key={booking.id}>
              <Card className="d-flex flex-row mt-2">
                <Col xs={3}>
                  <Card.Img src={booking.equipment.img} className="w-100" />
                </Col>
                <Col xs={9}>
                  <Card.Body>
                    <Card.Title>
                      {booking.user.firstname} {booking.user.lastname}
                    </Card.Title>
                    <Card.Text>
                      {booking.equipment.brand} <br />
                      {booking.equipment.model} <br />
                      {booking.equipment.category} <br />
                      {booking.day} <br />
                      {booking.equipment.price} €
                    </Card.Text>
                    <div className="d-flex justify-content-between">
                      <Button href={"mailto:" + booking.user.email} target="_blank" className="me-3 btn-danger">
                        Contatta cliente
                      </Button>
                    </div>
                  </Card.Body>
                </Col>
              </Card>
            </Row>
          ))}
      </Container>
    </>
  );
}

export default AllBookingComponent;
