import { useEffect, useState } from "react";
import { Alert, Container, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";

function EditEquipmentComponent() {
  const [show, setShow] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertHeading, setAlertHeading] = useState("");
  const { id } = useParams();

  const navigate = useNavigate();

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [category, setCategory] = useState("");
  const [img, setImg] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");

  const handleBrand = (event) => {
    setBrand(event.target.value);
  };
  const handleModel = (event) => {
    setModel(event.target.value);
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };
  const handleImg = (event) => {
    setImg(event.target.value | event.target.defaultValue);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handlePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleSize = (event) => {
    setSize(event.target.value);
  };

  const editProduct = async () => {
    let product = {
      id: id,
      brand: brand,
      model: model,
      description: description,
      category: category,
      img: img,
      price: price,
      size: size,
    };
    try {
      let response = await fetch(`http://localhost:8080/api/equipment/${product.id}`, {
        method: "PUT",
        body: JSON.stringify(product),
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      console.log(product);
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        setAlertHeading("Modifica prodotto");
        setAlertMsg("Prodotto modificato correttamente");
        setShow(true);
        window.scrollTo(0, 0);
      } else {
      }
    } catch (error) {
      setAlertHeading("Modifica prodotto");
      setAlertMsg(error);
      setShow(true);
      window.scrollTo(0, 0);
      console.log(error);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    editProduct();
  };
  const getItem = async () => {
    try {
      let response = await fetch(`http://localhost:8080/api/equipment/${id}`);
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        setBrand(data.brand);
        setModel(data.model);
        setCategory(data.category);
        setDescription(data.description);
        setImg(data.img);
        setPrice(data.price);
        setSize(data.size);
      } else {
        console.log("Errore nella ricezione dei dati");
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  useEffect(() => {
    getItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="mt-5">
      <h3>MODIFICA PRODOTTO</h3>
      {show && (
        <Alert
          variant="light"
          onClose={() => {
            setShow(false);
            navigate("/details/" + id);
          }}
          dismissible
        >
          <Alert.Heading>{alertHeading}</Alert.Heading>
          <p>{alertMsg}</p>
        </Alert>
      )}
      <Form onSubmit={handleSubmit} className="">
        <Form.Group className="mb-3 mx-auto" controlId="brand" onChange={handleBrand}>
          <Form.Label>Brand</Form.Label>
          <Form.Control required type="text" maxLength={255} defaultValue={brand} placeholder="insert brand.." />
        </Form.Group>
        <Form.Group className="mb-3 mx-auto" controlId="model" onChange={handleModel}>
          <Form.Label>Model</Form.Label>
          <Form.Control required type="text" maxLength={255} defaultValue={model} placeholder="insert model.." />
        </Form.Group>
        <Form.Group className="mb-3 mx-auto" controlId="category" onChange={handleCategory}>
          <Form.Label>Category</Form.Label>
          <select
            className="form-select"
            required
            type="select"
            maxLength={255}
            defaultValue={category}
            aria-label="Categories"
          >
            <option selected={category === "SURF" ? true : false} value="SURF">
              Surf
            </option>
            <option selected={category === "WINDSURF" ? true : false} value="WINDSURF">
              Windsurf
            </option>
            <option selected={category === "KITESURF" ? true : false} value="KITESURF">
              Kitesurf
            </option>
            <option selected={category === "WAKEBOARD" ? true : false} value="WAKEBOARD">
              Wakeboard
            </option>
          </select>
        </Form.Group>
        <Form.Group className="mb-3 mx-auto" controlId="description" onChange={handleDescription}>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            required
            type="text-area"
            maxLength={255}
            defaultValue={description}
            placeholder="insert description.."
          />
        </Form.Group>
        <Form.Group className="mb-3 mx-auto" controlId="price" onChange={handlePrice}>
          <Form.Label>Price</Form.Label>
          <Form.Control required type="number" maxLength={255} defaultValue={price} placeholder="insert price.." />
        </Form.Group>
        <Form.Group className="mb-3 mx-auto" controlId="size" onChange={handleSize}>
          <Form.Label>Size</Form.Label>
          <Form.Control required type="text" maxLength={255} defaultValue={size} placeholder="insert size.." />
        </Form.Group>
        <Form.Group className="mb-3 mx-auto" controlId="img" onChange={handleImg}>
          <Form.Label>Image</Form.Label>
          <Form.Control required type="text" maxLength={255} defaultValue={img} placeholder="insert img.." />
        </Form.Group>
        <Button type="submit" variant="success" className="me-2">
          Salva
        </Button>
        <Button type="reset" variant="danger" onClick={() => navigate("/details/" + id)}>
          Annulla
        </Button>
      </Form>
    </Container>
  );
}

export default EditEquipmentComponent;
