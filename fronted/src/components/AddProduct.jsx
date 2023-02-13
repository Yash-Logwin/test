import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
fgnfn
const AddProduct = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    category: "",
    company: "",
  });
    
  const resetForm = () => {
    setProductData({
      name: "",
      price: "",
      category: "",
      company: "",
    });
  };

  const getValues = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const addProductData = async () => {
    const { name, price, category, company } = productData;
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }else{
        setError(false);
    }
    
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:8000/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-Type": "application/json",
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    });
    result = await result.json();
    console.log(result);
    navigate('/')
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    addProductData();
    resetForm();
  };
  return (
    <div>
      <Container>
        <Row>
          <Col style={{ display: "flex", justifyContent: "center" }}>
            <Form onSubmit={onFormSubmit}>
              <Card style={{ width: "500px" }} className="m-5">
                <Card.Header
                  style={{ fontSize: "25px" }}
                  className="hederfooter"
                >
                  Add Product{" "}
                </Card.Header>
                <Card.Body style={{ background: "rgb(0, 221, 255)" }}>
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Product Name"
                      value={productData.name}
                      name="name"
                      onChange={getValues}
                    />
                  </Form.Group>
                  {error && !productData.name && (
                    <spane class="invalid-input">Enter Valid Name </spane>
                  )}

                  <Form.Group className="mb-3" controlId="formBasicPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Product Price"
                      name="price"
                      value={productData.price}
                      onChange={getValues}
                    />
                  </Form.Group>
                  {error && !productData.price && (
                    <spane class="invalid-input">Enter Valid Price </spane>
                  )}

                  <Form.Group className="mb-3" controlId="formBasicCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Product Category"
                      name="category"
                      value={productData.category}
                      onChange={getValues}
                    />
                  </Form.Group>
                  {error && !productData.category && (
                    <spane class="invalid-input">Enter Valid Category </spane>
                  )}

                  <Form.Group className="mb-3" controlId="company">
                    <Form.Label>Company</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Product Company"
                      name="company"
                      value={productData.company}
                      onChange={getValues}
                    />
                  </Form.Group>
                  {error && !productData.company && (
                    <spane class="invalid-input">Enter Valid Company </spane>
                  )}
                </Card.Body>
                <Card.Footer className="hederfooter">
                  <Button
                    variant="danger"
                    className="signup-btn p-2"
                    type="submit"
                  >
                    Add Product
                  </Button>
                </Card.Footer>
              </Card>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddProduct;
