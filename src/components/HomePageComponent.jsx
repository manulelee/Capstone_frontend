import { Card } from "react-bootstrap";
import CarouselComponent from "./CarouselComponent";

const HomeComponent = () => {
  return (
    <span data-testid="homePage">
      <Card className="banner m-3" data-testid="banner">
        <Card.Img
          variant="top"
          src="https://cdn.shopify.com/s/files/1/0377/3058/2573/t/1/assets/surfboardwasll_GDPp.jpeg?v=1644380509379"
          className="mx-auto w-100 "
          alt="surf store image"
        />
        <Card.Body>
          <Card.Title className="fs-4">Stai organizzando il tuo prossimo surf trip in Sardegna?</Card.Title>
          <Card.Text className="fs-5">
            Nel nostro shop troverai la migliore attrezzatura da noleggiare per tutti quei surfisti che non possono
            portare la propria attrezzatura, o per coloro che vogliono provare nuove tavole. Siamo lieti di offrire
            un'ampia selezione di prodotti , tra cui le tavole da surf più performanti sul mercato tra cui Al Merrick,
            Lost, Pukas, Fanitic, Duotone e Slingshot. La scelta della giusta tavola da surf è fondamentale per avere
            un'esperienza di surf ottimale, ed è per questo che offriamo una guida completa per aiutarti a scegliere la
            tavola perfetta per te.
          </Card.Text>
        </Card.Body>
      </Card>

      <CarouselComponent category="Surf"></CarouselComponent>
      <CarouselComponent category="Windsurf"></CarouselComponent>
      <CarouselComponent category="Kitesurf"></CarouselComponent>
      <CarouselComponent category="Wakeboard"></CarouselComponent>
    </span>
  );
};

export default HomeComponent;
