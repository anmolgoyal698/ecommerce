import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import { FaTrash } from "react-icons/fa";
import { addItemToCart, deleteItemFromCart } from "../slices/cartSlice";
const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const totalItems = cartItems.reduce((acc, cur) => acc + cur.qty, 0);

  const handleQtyChange = (product, qty) => {
    dispatch(addItemToCart({...product, qty}));
  }

  const deleteCartItemHandler = (id) => {
    dispatch(deleteItemFromCart(id));
  }

  return (
    <Row>
      <Col md={8}>
        <h1 className="mb-3">Shopping Cart</h1>
        {cartItems.length > 0 ? (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/products/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) => handleQtyChange(item, +e.target.value)}
                    >
                      {Array.from(
                        { length: item!.countInStock },
                        (_, idx: number) => (
                          <option key={idx + 1} value={idx + 1}>
                            {idx + 1}
                          </option>
                        )
                      )}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button type="button" variant="light" onClick={() => deleteCartItemHandler(item._id)}>
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <Message>
            Your cart is empty <Link to="/">Go back</Link>
          </Message>
        )}
      </Col>
      {cartItems.length > 0 && (
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>Subtotal ({totalItems}) items</h3>${cart.itemsPrice}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button type="button" className="btn-block">
                  Proceed to checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      )}
    </Row>
  );
};

export default CartScreen;
