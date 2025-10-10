import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import type { IProduct } from "../models/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";

const HomeScreen = () => {

  const {data: products, isLoading, error} = useGetProductsQuery();

  if(isLoading) {
    return <h1>Loading...</h1>
  }

  if(error) {
    return <h3>{error.data?.message || error.error}</h3>
  } 

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product: IProduct) => {
          return (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product}/>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default HomeScreen;
