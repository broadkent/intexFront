import React from "react";
import { Navbar, Nav } from "react-bootstrap";

export default function TopContainer() {
  return (
    <Navbar style={{ backgroundColor: "#fff" }}>
      <Navbar.Brand href='/' className='mr-35vw'>
        <img src='./images/Logo_SANSBG.png' alt='logo' style={{ width: "100px" }} />
      </Navbar.Brand>
      <Nav className='justify-content-center font-weight-bold'>
        <Nav.Link href='/campaigns'>ADMIN TOOL</Nav.Link>
        <Nav.Link href='/calculator'>PREDICTION CALCULATOR</Nav.Link>
        <Nav.Link href='/training'>TRAINING</Nav.Link>
      </Nav>
    </Navbar>
  );
}

// bg="light" variant="light"
// className="mr-auto"
