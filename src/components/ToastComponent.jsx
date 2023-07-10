import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";

function ToastComponent(props) {
  const [showA, setShowA] = useState(true);

  const toggleShowA = () => setShowA(!showA);

  return (
    <Row>
      <Col md={6} className="mb-2">
        <Toast show={showA} onClose={toggleShowA}>
          <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            <strong className="me-auto">{props.titolo}</strong>
            <small>{new Date().toDateString()}</small>
          </Toast.Header>
          <Toast.Body>{props.testo}</Toast.Body>
        </Toast>
      </Col>
    </Row>
  );
}

export default ToastComponent;
