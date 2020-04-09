import React from "react";
import * as bs from "react-bootstrap";

function Training(props) {
  return (
    <bs.Container>
      <bs.Row
        className='justify-content-center lato font-weight-bolder dropshadow-white'
        style={{ display: "flex", padding: "2rem", color: "#83AC25", fontSize: "50pt" }}>
        training
      </bs.Row>
      <bs.Row
        style={{ display: "flex", flexDirection: "row" }}
        noGutters
        className='flex-grow-0 flex-shrink-0'>
        <bs.Col className='d-flex justify-content-center'>
          <bs.Card style={{ padding: "2rem" }} className='mb-4'>
            <iframe
              title='training video'
              width='800'
              height='450'
              src='https://www.youtube.com/embed/XhD1F6_fRLc'
              frameborder='0'
              allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
              allowfullscreen></iframe>
          </bs.Card>
        </bs.Col>
      </bs.Row>
      <bs.Row className='justify-content-center'>
        <bs.Nav.Link
          style={{
            backgroundColor: "#83AC25	",
            borderColor: "#FFFFFF",
            borderWidth: "4pt",
            width: "15rem",
            height: "3rem",
            color: "#FFFFFF",
            boxShadow: "3px 3px 0px #999999",
          }}
          href={"/"}
          className='btn m-4 rounded-pill font-weight-bold'>
          <i className='fas fa-arrow-left p-1'></i>
          Back to Home
        </bs.Nav.Link>
      </bs.Row>
    </bs.Container>
  );
}
export default Training;
