import { Component } from "react";
import { Button, Card } from "react-bootstrap";

class CarouselCardComponent extends Component {
  render() {
    console.log(this.props.equipment);
    return (
      <Card className="text-start d-inline-block" style={{ width: "18rem" }}>
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
          <Button variant="success">Details</Button>
        </Card.Body>
      </Card>
    );
  }
}

export default CarouselCardComponent;
