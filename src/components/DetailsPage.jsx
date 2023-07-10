import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function DetailsPage() {
  const profile = useSelector((state) => state.profile);
  const isAdmin = profile.roles.length >= 2;
  const isUser = profile.roles.length === 1;

  let today = new Date().toISOString().split("T")[0];

  const { id } = useParams();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [equipment, setEquipment] = useState({
    id: "",
    brand: "",
    description: "",
    size: "",
    category: "",
    model: "",
    price: "",
    img: "",
  });

  const getItem = async () => {
    try {
      let response = await fetch(`http://localhost:8080/api/equipment/${id}`);
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        setEquipment(data);
        setIsLoading(false);
      } else {
        console.log("Errore nella ricezione dei dati");
        setIsError(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  useEffect(() => {
    getItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteEquipment = async () => {
    try {
      let response = await fetch(`http://localhost:8080/api/equipment/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        alert("Prodotto eliminato correttamente");
        navigate("/");
      } else if (response.status === 500) {
        alert("Impossibile eliminare \n Alcune prenotazioni sono associate a questo prodotto...");
      }
    } catch (error) {
      console.log("ERRORE: " + error);
    }
  };

  const saveBooking = async () => {
    let booking = {
      day: date,
      equipment: equipment,
      user: profile,
    };
    try {
      let response = await fetch(`http://localhost:8080/api/booking`, {
        method: "POST",
        body: JSON.stringify(booking),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        alert("Prenotazione effettuata correttamente");
        navigate("/");
      } else if (response.status === 401) {
        alert("Prodotto non disponibile per la data " + booking.day);
      }
    } catch (error) {
      console.log("ERRORE: " + error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveBooking();
  };

  const [date, setDate] = useState(today);

  const handleDate = (event) => {
    console.log(event.target.value);
    console.log(today);
    if (event.target.value < today) {
      alert("Non puoi prenotare per un giorno già passato");
      return;
    }
    setDate(event.target.value);
  };

  return (
    <Container className="mt-5">
      {isLoading && (
        <Spinner animation="border" role="status" variant="danger" className="mx-auto">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {isError && <p>Errore nella ricezione dei dati</p>}
      <Row>
        <Col xs={12} md={6} className="d-flex justify-content-center">
          <img
            src={equipment.img}
            alt={"Product " + equipment.id + " image"}
            onError={(event) =>
              (event.target.src =
                "https://cdn.icon-icons.com/icons2/1189/PNG/512/1490793840-user-interface33_82361.png")
            }
            className="w-75"
          ></img>
        </Col>
        <Col xs={12} md={6} className="mt-5">
          <h2>{equipment.model}</h2>
          <p>{equipment.description}</p>
          <p>
            <span className="fw-bold">Misure: </span>
            {equipment.size}
          </p>
          <p>
            <span className="fw-bold">Prezzo: </span> {equipment.price} € /giorno
          </p>
          {!isAdmin && !isUser && (
            <>
              <p className="mt-5">Effettua il login e prenota ora!</p>
              <Button type="button" className="btn btn-success" onClick={() => navigate("/login")}>
                LOGIN
              </Button>
            </>
          )}
          {isUser && (
            <Form onSubmit={handleSubmit} className="mt-5">
              <Form.Group className="mb-3" controlId="data" onChange={handleDate}>
                <Form.Control required value={date} type="date" />
              </Form.Group>
              <Button type="submit" className="btn btn-success">
                PRENOTA
              </Button>
            </Form>
          )}
          {isAdmin && (
            <>
              <Button type="button" className="btn btn-danger me-2" onClick={deleteEquipment}>
                ELIMINA
              </Button>
              <Button type="button" className="btn btn-warning " onClick={() => navigate(`/edit/${equipment.id}`)}>
                MODIFICA
              </Button>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}
export default DetailsPage;
