import { Container, Nav, Navbar } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header>
      <Navbar expand="md" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">ProShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/cart" className="d-flex align-items-center"><FaShoppingCart className="me-2"/>Cart</Nav.Link>
              <Nav.Link as={Link} to="/signIn" className="d-flex align-items-center"><FaUser className="me-2"/>Sign In</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
