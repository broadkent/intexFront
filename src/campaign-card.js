import React from "react";
import * as bs from "react-bootstrap";
import LottieHeart from "./lottieHeart";
import LottieShare from "./lottieShare";
import { Nav } from "react-bootstrap";
function CampaignCard(props) {
  if (!props.campaign) {
    return (
      // <h2>Error: Campaign not found.</h2>

      <bs.Spinner animation='border' role='status'>
        <span className='sr-only'>Loading...</span>
      </bs.Spinner>
    );
  }

  return (
    <bs.Card className='mb-2'>
      {/* <bs.Card.Img variant='top' src={"/media/products/" + props.filename + "-1.png"} /> */}
      <bs.Card.Body>
        <bs.Row style={{ display: "flex", flexDirection: "row" }}>
          <bs.Card.Img
            // src={require("./testimage.png")}
            src={props.campaign.campaign_image_url}
            style={{ width: "15rem", height: "15rem", padding: "2rem" }}
          />
          <bs.Col>
            <bs.Row>
              <bs.Col md={7} style={{ padding: "1rem" }}>
                <bs.Card.Title className='font-weight-bold' style={{ fontSize: "20pt" }}>
                  {props.campaign.title}
                </bs.Card.Title>
                <div style={{ fontSize: "14pt" }}>
                  <p>Days Active: {props.campaign.days_active}</p>
                  <p>Total: ${props.campaign.current_amount}</p>
                  <p>Goal: ${props.campaign.goal}</p>
                  <p>Fraud Level: {props.campaign.riskScoreQuartile}</p>
                </div>
              </bs.Col>
              <bs.Col className='justify-content-end'>
                <bs.Row>
                  <bs.Col>
                    <LottieHeart />
                  </bs.Col>
                  <bs.Col style={{ position: "absolute", left: "130px", fontSize: "18px" }}>
                    {" "}
                    <br />
                    {props.campaign.campaign_hearts}
                  </bs.Col>
                </bs.Row>
                <bs.Row className='align-content-center'>
                  <bs.Col style={{ position: "absolute", left: "130px", fontSize: "18px" }}>
                    <br />
                    {props.campaign.social_share_total}
                  </bs.Col>
                  <bs.Col>
                    <LottieShare />
                  </bs.Col>
                </bs.Row>
              </bs.Col>
            </bs.Row>
            <bs.Row>
              <bs.Col className='justify-content-end'>
                <Nav.Link
                  href={"/campaigns/" + props.campaign.campaign_id}
                  className='btn btn-light absolute-center m-4 rounded-pill font-weight-bold'
                  style={{
                    backgroundColor: "#83AC25",
                    borderColor: "#FFFFFF",
                    borderWidth: "4pt",
                    width: "10rem",
                    height: "3rem",
                    fontSize: "13pt",
                    color: "#FFFFFF",
                    boxShadow: "3px 3px 0px #999999",
                    position: "absolute",
                    right: "12px",
                    bottom: "-12px",
                  }}
                  size='lg'>
                  Details
                </Nav.Link>
              </bs.Col>
            </bs.Row>
          </bs.Col>
        </bs.Row>
        {/* <bs.Card.Title>{props.name}</bs.Card.Title>
        <bs.Card.Text>${props.price}</bs.Card.Text>
        <Link
          to={"/product/" + props.id} //! Change to proper api 
          variant='primary'
          className='btn btn-light'
          style={{ position: "absolute", right: "10px", top: "10px" }}>
          Details
        </Link> */}
      </bs.Card.Body>
    </bs.Card>
  );
}

export default CampaignCard;

//!ALL FUNCTION NAMES NEED TO BE CAPITALIZED
