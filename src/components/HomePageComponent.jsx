import CarouselComponent from "./CarouselComponent";

const HomeComponent = () => {
  return (
    <>
      <CarouselComponent category="Surf"></CarouselComponent>
      <CarouselComponent category="Windsurf"></CarouselComponent>
      <CarouselComponent category="Kitesurf"></CarouselComponent>
      <CarouselComponent category="Wakeboard"></CarouselComponent>
    </>
  );
};

export default HomeComponent;
