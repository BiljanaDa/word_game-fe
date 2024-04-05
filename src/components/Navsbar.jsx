import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Navsbar() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to={"/game"}>
          Word Game
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to={"/game"}>
            Game
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
