import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Hero from "./hero";

export default function Home() {
  return (
    <Container fluid className='p-0'>
      <Row noGutters className='flex-grow-0 flex-shrink-0'>
        <Col style={{ backgroundColor: "#F3F3F3" }}>
          <Hero />
        </Col>
      </Row>
    </Container>
  );
}
