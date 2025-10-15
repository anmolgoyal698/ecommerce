import { Badge, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import { resetCredentials } from "../slices/authSlice";

const Header = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const totalItemsInCart = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logout, {isLoading}] = useLogoutMutation();

  const logoutHandler = async () => {
    // Dispatch logout action
    try {
        await logout().unwrap();
        dispatch(resetCredentials());
        navigate('/login');

    } catch (error) {
        console.error("Failed to logout:", error);
        toast.error(error?.data?.message || error.error);
    }
    
  };

  return (
    <header>
      <Navbar expand="md" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            ProShop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link
                as={Link}
                to="/cart"
                className="d-flex align-items-center"
              >
                <FaShoppingCart className="me-2" />
                Cart
                {totalItemsInCart > 0 && (
                  <Badge pill className="ms-2">
                    {totalItemsInCart}
                  </Badge>
                )}
              </Nav.Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <NavDropdown.Item as={Link} to="/profile">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link
                  as={Link}
                  to="/login"
                  className="d-flex align-items-center"
                >
                  <FaUser className="me-2" />
                  Sign In
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
