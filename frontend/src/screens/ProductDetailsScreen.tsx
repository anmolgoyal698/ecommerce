import { Link, useParams } from "react-router-dom";
import products from "../products";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import Rating from "../components/Rating";

const ProductDetailsScreen = () => {
  const { id } = useParams();
  const product = products.find((product) => product._id === id);

  if (!product) {
    return null;
  }
  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go back
      </Link>
      <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>

            <ListGroup.Item>
              <Rating
                rating={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>{product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>${product.price}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>{product.countInStock > 0 ? 'In stock' : 'Out of stock'}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button type="button" className="btn-block" disabled={!product.countInStock}>Add to cart</Button>
              </ListGroup.Item>
              
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductDetailsScreen;
