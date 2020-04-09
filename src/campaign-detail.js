
import React, { useEffect  } from 'react'
import { Container, Table, Row, Col, Spinner, Nav, Card, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
// import AppContext from "./context";
import axios from 'axios'


export default function CampaignDetail() {
  // const context = React.useContext(AppContext);
  // const history = useHistory();

  let { campaignID } = useParams();
  let [campaignObjects, setcampaigns] = React.useState({});
  useEffect(async () => {
    var token = "JWT " + localStorage.getItem("accessToken");
    const resp = await axios.get("http://127.0.0.1:8000/api/searchcampaigns/" + campaignID, {
      headers: {
        Authorization: token,
      },
    });
    const prods = {};
    for (const c of resp.data) {
      prods[c.pk] = c.fields;
    }

    setcampaigns(prods)  
  },[campaignID])

    // useEffect(() => {
  //   async function hello() {
  //     var token = "JWT " + localStorage.getItem("accessToken");
  //     const resp = await axios.get("http://127.0.0.1:8000/api/searchcampaigns/" + campaignID,{ headers: {
  //     Authorization: token,
  //   }})
  //   const prods = {}
  //   for ( const c of resp.data){
  //       prods[c.pk] =c.fields
  //   }
  //   setcampaigns(prods)  
  // }},[])
  // useEffect(() => {
  //   async function fetchData() {
  //     // You can await here
  //     const response = await MyAPI.getData(someId);
  //     // ...
  //   }
  //   fetchData();
  // }, [someId]); // Or [] if effect doesn't need props or state

  let campaignObject = campaignObjects;
  if (Object.keys(campaignObject).length == 0) {

    return (
      <Spinner animation='border' role='status'>
        <span className='sr-only'>Loading...</span>
      </Spinner>
    );

  } else {
    let campaign = undefined;
    Object.values(campaignObjects).map((c) => {
      return campaign = c;
    });


    return (
      <Container>
        <Row className='justify-content-center'>
          <Nav.Link
            style={{
              backgroundColor: "#83AC25	",
              borderColor: "#FFFFFF",
              borderWidth: "4pt",
              width: "15rem",
              height: "3rem",
              color: "#FFFFFF",
              boxShadow: "3px 3px 0px #999999",
            }}
            href={"/campaigns"}
            className='btn m-4 rounded-pill font-weight-bold'>
            <i className='fas fa-arrow-left p-1'></i>
            Back to Campaigns
          </Nav.Link>

        </Row>

        {/* Uncomment when axios is connected */}

        <Row className='justify-content-center'>
          <Card style={{ padding: "5rem", paddingTop: "1rem", width: "60rem" }}>
            <Row style={{ padding: "3rem" }}>
              <Col className='align-content-center'>
                <Image src={campaign.campaign_image_url} style={{ width: "20rem" }} />
              </Col>
              <Col className='align-content-center'>
                <Container
                  className='lato font-weight-bolder dropshadow-white'
                  style={{
                    display: "flex",
                    color: "#83AC25",
                    fontSize: "25pt",
                  }}>
                  {campaign.title}
                </Container>
              </Col>
            </Row>

            {/* Uncomment when axios is connected */}
            <Row className='justify-content-center'>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ width: "280px" }}>Auto Facebook Post Mode</td>
                    <td>{campaign.auto_fb_post_mode.toString()}</td>
                  </tr>
                  <tr>
                    <td>Category</td>
                    <td>{campaign.category}</td>
                  </tr>
                  <tr>
                    <td>Current Amount Raised</td>
                    <td>${campaign.current_amount}</td>
                  </tr>
                  <tr>
                    <td>Goal Amount</td>
                    <td>${campaign.goal}</td>
                  </tr>
                  <tr>
                    <td>Donators</td>
                    <td>{campaign.donators}</td>
                  </tr>
                  <tr>
                    <td>Days Active</td>
                    <td>{campaign.days_active}</td>
                  </tr>
                  <tr>
                    <td>Campaign Description</td>
                    <td>{campaign.description}</td>
                  </tr>
                  <tr>
                    <td>Has Beneficiary</td>
                    <td>{campaign.has_beneficiary.toString()}</td>
                  </tr>
                  <tr>
                    <td>Donations Paused</td>
                    <td>{campaign.turn_off_donations.toString()}</td>
                  </tr>
                  <tr>
                    <td>Visible in Search</td>
                    <td>{campaign.visible_in_search.toString()}</td>
                  </tr>
                  <tr>
                    <td>Status (active/inactive)</td>
                    <td>{campaign.status.toString()}</td>
                  </tr>
                  <tr>
                    <td>Deactivated by GoFundMe</td>
                    <td>{campaign.deactivated.toString()}</td>
                  </tr>
                  <tr>
                    <td>Launch Date</td>
                    <td>{campaign.launch_date}</td>
                  </tr>
                  <tr>
                    <td>Hearts</td>
                    <td>{campaign.campaign_hearts}</td>
                  </tr>
                  <tr>
                    <td>Total Social Shares</td>
                    <td>{campaign.social_share_total}</td>
                  </tr>
                  <tr>
                    <td>City</td>
                    <td>{campaign.location_city}</td>
                  </tr>
                  <tr>
                    <td>Country</td>
                    <td>{campaign.location_country}</td>
                  </tr>
                  <tr>
                    <td>Zip</td>
                    <td>{campaign.location_zip}</td>
                  </tr>
                  <tr>
                    <td>Is Charity</td>
                    <td>{campaign.is_charity.toString()}</td>
                  </tr>
                  <tr>
                    <td>Charity Name</td>
                    <td>{campaign.charity_name}</td>
                  </tr>
                </tbody>
              </Table>
            </Row>
          </Card>
        </Row>
        <Row style={{ height: "3rem" }}></Row>
      </Container>
    );
  }
}
