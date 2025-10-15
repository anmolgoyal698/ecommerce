import {useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import { Button, Col, Form, FormGroup, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../slices/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, {isLoading}] = useLoginMutation();

  const {userInfo} = useSelector(state => state.auth);

  const {search} = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";


  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    //dispatch login
    try {
        const res = await login({email, password}).unwrap();
        dispatch(setCredentials({...res}));
        navigate(redirect);
    } catch (error) {
        console.error("Failed to login:", error);
        toast.error(error?.data?.message || error.error);
    }
  
  };

  return (
    <FormContainer>
      <h1 className="mt-3">Sign In</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup controlId="email" className="my-2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" className="my-2">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
        </FormGroup>
        <Button type="submit" variant="primary" className="my-2" disabled={isLoading}>
          Sign In
        </Button>
        {isLoading && <Loader />}
      </Form>
      <Row>
        <Col className="py-3">
          New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
