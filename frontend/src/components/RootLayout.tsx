import { Container } from "react-bootstrap";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const RootLayout = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
