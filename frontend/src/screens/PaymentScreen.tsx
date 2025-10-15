import Form from "react-bootstrap/esm/Form"
import CheckoutSteps from "../components/CheckoutSteps"
import FormContainer from "../components/FormContainer"
import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePaymentMethod } from "../slices/cartSlice";

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const {shippingAddress} = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
     if(Object.keys(shippingAddress).length === 0) {
       navigate("/shipping");
     }
  }, [navigate, shippingAddress]);

  const submitHandler = (e) => {
    e.preventDefault();
    //save payment method in redux
    dispatch(updatePaymentMethod(paymentMethod));
    //navigate to place order
    navigate("/placeorder");
  }

  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="paymentMethod" className="my-2">
            <Form.Label as="legend">Select Method</Form.Label>
            <Form.Check
              className="my-2"
              type="radio"
              label="PayPal"
              id="paypal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Form.Group>
            <Button type="submit" variant="primary" className="my-2">Continue</Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen