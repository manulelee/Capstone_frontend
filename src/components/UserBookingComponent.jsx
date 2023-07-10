import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { AiOutlineCalendar } from "react-icons/ai";
import { useSelector } from "react-redux";

function UserBookingComponent() {
  const profile = useSelector((state) => state.profile);
  const [booking, setBooking] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getBookings = async () => {
    try {
      let response = await fetch(`http://localhost:8080/api/booking/user/${profile.username}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        setBooking(data);
        setIsLoading(false);
      } else {
        console.log("Errore nella ricezione dei dati");
        setIsLoading(false);
        setIsError(true);
      }
    } catch (error) {
      console.log("ERRORE: " + error);
    }
  };
  const deleteBooking = async (id) => {
    try {
      let response = await fetch(`http://localhost:8080/api/booking/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        let data = await response;
        console.log(data);
        alert("Prenotazione eliminata correttamente");
        getBookings();
      } else {
        console.log("Errore nell'eliminazione della prenotazione");
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
        <h3 className="mt-3 mx-0">Le mie prenotazioni:</h3>
        {isLoading && (
          <Spinner animation="border" role="status" variant="danger" className="mx-auto">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {isError && <p>Errore nella ricezione dei dati</p>}
        {booking.length === 0 && isLoading === false && (
          <p className="mt-3">Non hai ancora effettuato nessuna prenotazione</p>
        )}
        {booking
          .sort((a, b) => new Date(a.day) - new Date(b.day))
          .map((booking) => (
            <Row key={booking.id} className="border broder-dark rounded mt-4 py-1">
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
                <h2>{booking.equipment.brand}</h2>
                <span>
                  <span className="fw-bold">Model: </span>
                  {booking.equipment.model} <br />
                  <span className="fw-bold">Data: </span>
                  {booking.day.split("-")[0] + "/" + booking.day.split("-")[1] + "/" + booking.day.split("-")[2]}
                  <br />
                  <span className="fw-bold">Prezzo: </span> {booking.equipment.price} €
                </span>
                <div className="d-flex justify-content-between">
                  <Button className="my-3 btn-danger" onClick={() => deleteBooking(booking.id)}>
                    Elimina prenotazione
                  </Button>
                </div>
              </Col>
            </Row>
          ))}
      </Container>
    </>
  );
}

export default UserBookingComponent;
