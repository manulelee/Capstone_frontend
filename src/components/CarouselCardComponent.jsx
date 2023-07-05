import { Component } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

class CarouselCardComponent extends Component {
  render() {
    return (
      <Card className="text-start d-inline-block carouselCard">
        <Card.Img
          className="card-img"
          variant="top"
          src={this.props.equipment.img}
          alt={"Product " + this.props.equipment.id + " image"}
          onError={(event) =>
            (event.target.src = "https://cdn.icon-icons.com/icons2/1189/PNG/512/1490793840-user-interface33_82361.png")
          }
        />
        <Card.Body>
          <Card.Title className="text-center">
            {this.props.equipment.brand} - {this.props.equipment.model}
          </Card.Title>
          <Card.Text>
            <span className="fw-bold">Categoria: </span>
            {this.props.equipment.category.toLowerCase().charAt(0).toUpperCase() +
              this.props.equipment.category.toLowerCase().slice(1)}{" "}
            <br></br>
            <span className="fw-bolder">Misure: </span>
            {this.props.equipment.size} <br></br>
            <span className="fw-bolder">Prezzo: </span>
            {this.props.equipment.price} € /giorno<br></br>
          </Card.Text>
          <Link to={`/details/${this.props.equipment.id}`}>
            <div className="btn btn-success">Dettagli</div>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

export default CarouselCardComponent;
