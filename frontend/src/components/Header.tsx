import { Badge, Container, Nav, Navbar } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {

  const cartItems = useSelector(state => state.cart.cartItems);

  const totalItemsInCart = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <header>
      <Navbar expand="md" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">ProShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/cart" className="d-flex align-items-center"><FaShoppingCart className="me-2"/>Cart 
                {totalItemsInCart > 0 && (
                  <Badge pill className="ms-2">{totalItemsInCart}</Badge>
                )}
              </Nav.Link>
              <Nav.Link as={Link} to="/signIn" className="d-flex align-items-center"><FaUser className="me-2"/>Sign In</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
