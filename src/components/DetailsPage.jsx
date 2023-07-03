import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

function DetailsPage() {
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

  const { id } = useParams();
  const getItem = async () => {
    try {
      let response = await fetch(`http://localhost:8080/api/equipment/${id}`);
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        setEquipment(data);
      } else {
        console.log("Errore nella ricezione dei dati");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("componentDidMount");
    getItem();
  }, []);

  return (
    <Container>
      <Row>
        <Col xs={12} md={6} className="detailsImg">
          <img src={equipment.img} alt="Ciao" className="w-100"></img>
        </Col>
        <Col xs={12} md={6}>
          <h2>{equipment.model}</h2>
          <p>{equipment.description}</p>
          <p>
            <span className="fw-bold">Price: </span> {equipment.price} € / day
          </p>
          <p>
            <span className="fw-bold">Size: </span>
            {equipment.size}
          </p>
        </Col>
      </Row>
    </Container>
  );
}
export default DetailsPage;
