import CarouselComponent from "./CarouselComponent";

const HomeComponent = () => {
  return (
    <>
      <div className="mt-4 ">
        <img
          src="https://uploads-ssl.webflow.com/5e877dfb60f46b392a7fee22/5f00507014696cd93940b8e2_surfboards.JPG"
          className="mx-auto w-100 "
          alt="surf store image"
        ></img>
        <p className=" p-4">
          La migliore attrezzatura da surf da noleggiare per tutti quei surfisti che non possono portare la propria
          attrezzatura, o per coloro che vogliono provare nuove tavole da surf e nuove sensazioni. Siamo lieti di
          offrire un'ampia selezione di prodotti di alta qualità, tra cui le tavole da surf più performanti sul mercato
          tra cui Al Merrick, Lost, Pukas, Bear e Firewire. La scelta della giusta tavola da surf è fondamentale per
          avere un'esperienza di surf ottimale, ed è per questo che offriamo una guida completa per aiutarti a scegliere
          la tavola perfetta per te. Nel nostro catalogo potrai trovare diverse tipologie di tavole, dalle shortboard
          alle longboard, passando per le midboard, softboard. Cerchiamo di soddisfare le esigenze di ogni livello di
          abilità. Tutti i nostri prodotti sono selezionati con cura per garantire la massima soddisfazione dei nostri
          clienti.
        </p>
      </div>
      <CarouselComponent category="Surf"></CarouselComponent>
      <CarouselComponent category="Windsurf"></CarouselComponent>
      <CarouselComponent category="Kitesurf"></CarouselComponent>
      <CarouselComponent category="Wakeboard"></CarouselComponent>
    </>
  );
};

export default HomeComponent;
