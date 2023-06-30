import CarouselComponent from "./CarouselComponent";
import NavbarComponent from "./NavbarComponent";

const HomeComponent = () => {
  return (
    <>
      <NavbarComponent></NavbarComponent>
      <CarouselComponent category="Surf"></CarouselComponent>
      <CarouselComponent category="Windsurf"></CarouselComponent>
      <CarouselComponent category="Kitesurf"></CarouselComponent>
      <CarouselComponent category="Wakeboard"></CarouselComponent>
    </>
  );
};

export default HomeComponent;
