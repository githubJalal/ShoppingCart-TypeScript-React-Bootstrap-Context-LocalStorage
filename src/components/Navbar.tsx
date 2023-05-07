import { Navbar as NavbarBs, Container, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { cartQty, openCartSidebar } =
    useContext(CartContext);

  return (
    <NavbarBs className="bg-muted shadow mb-4">
      <Container>
        <Nav>
          <Nav.Link to="/" as={NavLink}>
            Home
          </Nav.Link>
          <Nav.Link to="/shop" as={NavLink}>
            Shop
          </Nav.Link>
          <Nav.Link to="/about" as={NavLink}>
            About
          </Nav.Link>
        </Nav>
        <Button
          onClick={openCartSidebar}
          variant="light"
          className="hover-zoom"
          style={{
            width: "2.8rem",
            height: "2.8rem",
            position: "relative",
            fontSize: "1.2rem",
            border:'none'
          }}
        >
          <i className="bi bi-cart" />
          <div
            className=" text-success fw-bold d-flex justify-content-center align-items-center"
            style={{
              borderRadius: "40%",
              padding: "2px",
              fontSize: "0.9rem",
              position: "absolute",
              bottom: "0",
              right: "0",
              transform: "translate(25%,25%)",
            }}
          >
            {cartQty}
          </div>
        </Button>
      </Container>
    </NavbarBs>
  );
}

export default Navbar;
