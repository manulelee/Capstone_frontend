import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

function NewEquipmentComponent() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const [brand, setBrand] = useState(null);
  const [model, setModel] = useState(null);
  const [category, setCategory] = useState(null);
  const [img, setImg] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [size, setSize] = useState(null);

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
    setImg(event.target.value);
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

  const createProduct = async () => {
    let product = {
      brand: brand,
      model: model,
      description: description,
      category: category,
      img: img,
      price: price,
      size: size,
    };
    console.log(product);
    try {
      let response = await fetch(`http://localhost:8080/api/equipment`, {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        let data = await response.json();
        console.log(data);
        alert("Prodotto inserito correttamente");
        handleClose();
        window.scrollTo(0, 0);
        navigate(`/details/${data.id}`);
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    createProduct();
  };

  return (
    <>
      <div className="dropdown-item d-none d-lg-flex" onClick={handleShow}>
        Inserisci prodotto
      </div>
      <div className="nav-link d-lg-none" onClick={handleShow}>
        Inserisci prodotto
      </div>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>NUOVO PRODOTTO</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} className="">
            <Form.Group className="mb-3 mx-auto" controlId="brand" onChange={handleBrand}>
              <Form.Label>Brand</Form.Label>
              <Form.Control required type="text" maxLength={255} placeholder="insert brand.." />
            </Form.Group>
            <Form.Group className="mb-3 mx-auto" controlId="model" onChange={handleModel}>
              <Form.Label>Model</Form.Label>
              <Form.Control required type="text" maxLength={255} placeholder="insert model.." />
            </Form.Group>

            <Form.Group className="mb-3 mx-auto" controlId="category" onChange={handleCategory}>
              <Form.Label>Category</Form.Label>
              <select
                className="form-select"
                required
                type="select"
                maxLength={255}
                value={category}
                aria-label="Categories"
              >
                <option value="">Select category</option>
                <option value="SURF">Surf</option>
                <option value="WINDSURF">Windsurf</option>
                <option value="KITESURF">Kitesurf</option>
                <option value="WAKEBOARD">Wakeboard</option>
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
                placeholder="insert description.."
              />
            </Form.Group>
            <Form.Group className="mb-3 mx-auto" controlId="price" onChange={handlePrice}>
              <Form.Label>Price</Form.Label>
              <Form.Control required type="number" maxLength={255} placeholder="insert price.." />
            </Form.Group>
            <Form.Group className="mb-3 mx-auto" controlId="size" onChange={handleSize}>
              <Form.Label>Size</Form.Label>
              <Form.Control required type="text" maxLength={255} placeholder="insert size.." />
            </Form.Group>
            <Form.Group className="mb-3 mx-auto" controlId="img" onChange={handleImg}>
              <Form.Label>Image</Form.Label>
              <Form.Control required type="text" maxLength={255} placeholder="insert img.." />
            </Form.Group>
            <Button type="submit" variant="success" className="me-2">
              Salva
            </Button>
            <Button variant="danger" onClick={handleClose}>
              Chiudi
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NewEquipmentComponent;
