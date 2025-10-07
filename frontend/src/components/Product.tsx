import { Card } from "react-bootstrap";
import type { IProduct } from "../models/Product";
import { Link } from "react-router-dom";

const Product = ({ product }: { product: IProduct }) => {
  return (
    <Link className="product-link" to={`/products/${product._id}`}>
      <Card className="p-3 my-3">
        <Card.Img variant="top" src={product.image} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text as="h4">${product.price}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default Product;
