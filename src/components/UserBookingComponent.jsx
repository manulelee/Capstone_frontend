import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";

import { useSelector } from "react-redux";

function UserBookingComponent() {
  const profile = useSelector((state) => state.profile);
  const [booking, setBooking] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [show, setShow] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertHeading, setAlertHeading] = useState("");
  const [showExpired, setShowExpired] = useState(true);

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
        setAlertHeading("Elimina prenotazione");
        setAlertMsg("Prenotazione eliminata correttamente");
        setShow(true);
        window.scrollTo(0, 0);
      }
    } catch (error) {
      setAlertHeading("Elimina prenotazione");
      setAlertMsg("Errore nell'eliminazione della prenotazione");
      setShow(true);
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    getBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container className="page-container">
        <span className="d-flex justify-content-between">
          <h3 className="mt-3 mx-0">Le mie prenotazioni:</h3>
          <Form className="align-self-end">
            <Form.Check // prettier-ignore
              type="switch"
              id="switch"
              label="Nascondi scadute"
              onChange={() => setShowExpired(!showExpired)}
            />
          </Form>
        </span>
        {isLoading && (
          <Spinner animation="border" role="status" variant="danger" className="mx-auto">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {isError && <p>Errore nella ricezione dei dati</p>}
        {booking.length === 0 && isLoading === false && (
          <p className="mt-3">Non hai ancora effettuato nessuna prenotazione</p>
        )}
        {show && (
          <Alert
            variant="light"
            onClose={() => {
              setShow(false);
              getBookings();
            }}
            dismissible
          >
            <Alert.Heading>{alertHeading}</Alert.Heading>
            <p>{alertMsg}</p>
          </Alert>
        )}
        {showExpired &&
          booking
            .sort((a, b) => new Date(a.day) - new Date(b.day))
            .map((booking) => (
              <Row key={booking.id} className="border broder-dark rounded mt-4 py-1">
                <Col xs={12}></Col>
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
        {!showExpired &&
          booking
            .sort((a, b) => new Date(a.day) - new Date(b.day))
            .filter((booking) => booking.day >= new Date().toISOString().split("T")[0])
            .map((booking) => (
              <Row key={booking.id} className="border broder-dark rounded mt-4 py-1">
                <Col xs={12}></Col>
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
