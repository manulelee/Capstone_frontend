import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

function CategoryPageComponent() {
  const { category } = useParams();
  const [equipment, setEquipment] = useState([]);
  const getCategoryItems = async () => {
    try {
      let response = await fetch(`http://localhost:8080/api/equipment/category/${category.toUpperCase()}`);
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
    getCategoryItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <>
      <Container className="p-0">
        <h3 className="mt-3 mx-0">Attrezzatura {category}:</h3>
        {equipment.map((equipment) => (
          <Row key={equipment.id} className="border broder-dark rounded mt-4 py-2 mx-1">
            <Col xs={12} md={3}>
              <img
                src={equipment.img}
                alt={"Product " + equipment.id + " image"}
                onError={(event) =>
                  (event.target.src =
                    "https://cdn.icon-icons.com/icons2/1189/PNG/512/1490793840-user-interface33_82361.png")
                }
                className="w-100"
              />
            </Col>
            <Col xs={12} md={8}>
              <div>
                <h2>{equipment.brand}</h2>
                <h4>{equipment.model} </h4>
                <span className="fw-bold">Misure: </span>
                {equipment.size} <br />
                <span className="fw-bold">Prezzo: </span>
                {equipment.price} € / giorno
              </div>
              <Link to={`/details/${equipment.id}`}>
                <div className="btn btn-success m-2">Dettagli</div>
              </Link>
            </Col>
          </Row>
        ))}
      </Container>
    </>
  );
}

export default CategoryPageComponent;
