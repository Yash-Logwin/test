import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const resetForm = () => {
    setLoginData({
      email: "",
      password: "",
    });
  };

  const onGetValues = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };
  
  const userLogin = async () => {
    const {email, password } = loginData;
    let result = await fetch("http://localhost:8000/login", {
      method: "post",
      body: JSON.stringify({email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    if (result.auth) {
      navigate("/");
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      swal({
        title: "Login Successfully !",
        icon: "success",
        button: "Ok",
      });
    }else{
      swal({
        text: "Please enter correct details",
      });
      // alert("please enter connect details")
    }
    
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log(loginData);
    userLogin();
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
                  LogIn Form{" "}
                </Card.Header>
                <Card.Body style={{ background: "rgb(0, 221, 255)" }}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={loginData.email}
                      onChange={onGetValues}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={loginData.password}
                      onChange={onGetValues}
                    />
                  </Form.Group>
                </Card.Body>
                <Card.Footer className="hederfooter">
                  <Button
                    variant="dark"
                    className="signup-btn p-2"
                    type="submit"
                  >
                    LogIn
                  </Button>
                  <span style={{ marginLeft: "15px" }}>
                    Don't have any Account?
                    <Link style={{ marginLeft: "12px" }} to="/signup">
                      SignUp
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

export default Login;
