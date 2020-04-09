import React from "react";
import { Navbar, Nav, Image } from "react-bootstrap";

export default function TopContainer() {
  return (
    <Navbar style={{ backgroundColor: "#fff" }}>
      <Navbar.Brand href='/' className='mr-35vw'>
        <Image src='./images/icon.png' alt='logo' style={{ width: "50px" }} />
      </Navbar.Brand>
      <Nav className='justify-content-center' style={{ fontSize: "20pt" }}>
        <Nav.Link href='/campaigns'>ADMIN TOOL</Nav.Link>
        <Nav.Link href='/calculator'>PREDICTION CALCULATOR</Nav.Link>
        <Nav.Link href='/training'>TRAINING</Nav.Link>
      </Nav>
    </Navbar>
  );
}

// bg="light" variant="light"
// className="mr-auto"
