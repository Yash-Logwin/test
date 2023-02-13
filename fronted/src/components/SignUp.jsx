import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const reset = () => {
    setSignUpData({
      name: "",
      email: "",
      password: "",
    });
  };

  const getValues = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const addData = async () => {
    const { name, email, password } = signUpData;
    if (!name ||  !email || !password) {
      setError(true);
      return false;
    }else{
        setError(false);
    }

    let result = await fetch("http://localhost:8000/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    if (result) {
      navigate("/");
      localStorage.setItem("user", JSON.stringify(result.result));
      localStorage.setItem("token", JSON.stringify(result.auth));
      swal({
        title: "SignUp Successfully !",
        icon: "success",
        button: "Ok",
      });
    }
  };

  const formSubmit = (e) => {
    e.preventDefault();
    addData();
    reset();
  };

  return (
    <div>
      <Container>
        <Row>
          <Col style={{ display: "flex", justifyContent: "center" }}>
            <Form onSubmit={formSubmit}>
              <Card style={{ width: "500px" }} className="m-5">
                <Card.Header
                  style={{ fontSize: "25px" }}
                  className="hederfooter"
                >
                  SignUp Form{" "}
                </Card.Header>
                <Card.Body style={{ background: "rgb(0, 221, 255)" }}>
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Your Name"
                      value={signUpData.name}
                      name="name"
                      onChange={getValues}
                    />
                  </Form.Group>
                  {error && !signUpData.name && (
                    <spane class="invalid-input"> Name must be Required !</spane>
                  )}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={signUpData.email}
                      onChange={getValues}
                    />
                  </Form.Group>
                  {error && !signUpData.email && (
                    <spane class="invalid-input"> Email must be Required !</spane>
                  )}
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={signUpData.password}
                      onChange={getValues}
                    />
                  </Form.Group>
                  {error && !signUpData.password && (
                    <spane class="invalid-input"> Password must be Required !</spane>
                  )}
                </Card.Body>
                <Card.Footer className="hederfooter">
                  <Button
                    variant="dark"
                    className="signup-btn p-2"
                    type="submit"
                  >
                    SignUp
                  </Button>
                  <span style={{ marginLeft: "15px" }}>
                    Already have an Account?
                    <Link style={{ marginLeft: "12px" }} to="/login">
                      Login
                    </Link>
                  </span>
                </Card.Footer>
              </Card>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUp;
