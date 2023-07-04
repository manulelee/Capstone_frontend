import { Component } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

class CarouselCardComponent extends Component {
  render() {
    return (
      <Card className="text-start d-inline-block carouselCard">
        <Card.Img className="card-img" variant="top" src={this.props.equipment.img} />
        <Card.Body>
          <Card.Title className="text-center">
            {this.props.equipment.brand} - {this.props.equipment.model}
          </Card.Title>
          <Card.Text>
            <span className="fw-bold">Category: </span>
            {this.props.equipment.category.toLowerCase().charAt(0).toUpperCase() +
              this.props.equipment.category.toLowerCase().slice(1)}{" "}
            <br></br>
            <span className="fw-bolder">Size: </span>
            {this.props.equipment.size} <br></br>
            <span className="fw-bolder">Price: </span>
            {this.props.equipment.price} € / day<br></br>
          </Card.Text>
          <Link to={`/details/${this.props.equipment.id}`}>
            <div className="btn btn-success">Details</div>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

export default CarouselCardComponent;
