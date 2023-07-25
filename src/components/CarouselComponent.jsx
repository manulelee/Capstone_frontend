import { Component } from "react";
import Carousel from "react-grid-carousel";
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
      breakpoint: 1400,
      cols: 5,
    },
    {
      breakpoint: 1198,
      cols: 4,
    },
    {
      breakpoint: 910,
      cols: 3,
    },
    {
      breakpoint: 650,
      cols: 2,
    },
    {
      breakpoint: 480,
      cols: 1,
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
      <span data-testid="carousel">
        <h2 className="text-start mt-5 mb-2 b mx-4">{this.props.category}:</h2>
        {this.state.isLoading && (
          <div className="text-center">
            <Spinner animation="border" role="status" variant="danger">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            {this.state.isError && <Alert variant="danger">Errore nel caricamento</Alert>}
          </div>
        )}
        <Carousel cols={6} responsiveLayout={this.responsive} mobileBreakpoint={500} loop autoplay={8000}>
          {this.state.equipment.map((equipment) => (
            <Carousel.Item key={equipment.id}>
              <CarouselCardComponent equipment={equipment} />
            </Carousel.Item>
          ))}
        </Carousel>
      </span>
    );
  }
}

export default CarouselComponent;
