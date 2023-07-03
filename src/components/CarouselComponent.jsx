import { Component } from "react";
import Carousel from "react-grid-carousel";
//import "react-multi-carousel/lib/styles.css";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import CarouselCardComponent from "./CarouselCardComponent";

//ho usato il pacchetto npm react-grid-carousel per gestire il carosello con colonne multiple
class CarouselComponent extends Component {
  state = {
    equipment: [],
    isLoading: true,
    isError: false,
  };

  responsive = [
    {
      breakpoint: 3000,
      cols: 6,
      rows: 1,
      loop: true,
      autoplay: 10000,
    },
    {
      breakpoint: 1024,
      items: 5,
      rows: 1,
      loop: true,
      autoplay: 10000,
    },
    {
      breakpoint: 464,
      items: 4,
      rows: 1,
      loop: true,
      autoplay: 10000,
    },
    {
      breakpoint: 0,
      items: 2,
      rows: 1,
      loop: true,
      autoplay: 10000,
    },
  ];

  getEquipment = async () => {
    try {
      let response = await fetch(`http://localhost:8080/api/equipment/category/${this.props.category.toUpperCase()}`);
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        this.setState({
          equipment: data,
          isLoading: false,
        });
      } else {
        console.log("Errore nella ricezione dei dati");
        this.setState({
          isLoading: false,
          isError: true,
        });
      }
    } catch (error) {
      console.log(error);
      this.setState({
        isLoading: false,
        isError: true,
      });
    }
  };

  componentDidMount() {
    this.getEquipment();
  }

  render() {
    return (
      <>
        <h2 className="text-start mt-5 mb-2 b mx-4">{this.props.category} equipment:</h2>
        {this.state.isLoading && (
          <div className="text-center">
            <Spinner animation="border" role="status" variant="danger">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            {this.state.isError && <Alert variant="danger">Error while loading</Alert>}
          </div>
        )}
        <Carousel cols={4} rows={1} responsiveLayout={this.responsive} loop>
          {this.state.equipment.map((equipment) => (
            <Carousel.Item key={equipment.id}>
              <CarouselCardComponent equipment={equipment} />
            </Carousel.Item>
          ))}
        </Carousel>
      </>
    );
  }
}

export default CarouselComponent;
