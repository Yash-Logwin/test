import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    category: "",
    company: "",
  });
  useEffect(() => {
    getProductDetails();
  },[]);

  const getValues = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const getProductDetails = async () => {
    console.log(params);
    let result = await fetch(`http://localhost:8000/product/${params.id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.log(result);
    setProductData({
      name: result.name,
      price: result.price,
      category: result.category,
      company: result.company,
    });
  };
  const onFormSubmit = async (e) => {
    const { name, price, category, compony } = productData;
    e.preventDefault();
    // if(name  !== " " && price !== " "  && category !== " " && compony !== " "){
    let result = await fetch(`http://localhost:8000/product/${params.id}`, {
      method: "put",
      body: JSON.stringify({ name, price, category, compony }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.log(result);
    navigate("/");
    // }
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

                  <Form.Group className="mb-3" controlId="formBasicPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Product Price"
                      name="price"
                      value={productData.price}
                      onChange={getValues}
                    />
                  </Form.Group>

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

export default UpdateProduct;
