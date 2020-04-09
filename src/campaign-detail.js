import React, { useEffect  } from 'react'
import { Container, Table, Row, Col, Spinner, Nav } from "react-bootstrap";
import { useParams } from "react-router-dom";
// import AppContext from "./context";
import axios from 'axios'

export default function CampaignDetail() {
  // const context = React.useContext(AppContext);
  // const history = useHistory();

  let { campaignID } = useParams();
  let [campaignObjects,setcampaigns] = React.useState({})
  useEffect(async()=>{
    var token = "JWT " + localStorage.getItem("accessToken");
    const resp = await axios.get("http://127.0.0.1:8000/api/searchcampaigns/" + campaignID,{ headers: {
      Authorization: token,
    }})
    const prods = {}
    for ( const c of resp.data){
        prods[c.pk] =c.fields
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
  

  let campaignObject=campaignObjects
  if (Object.keys(campaignObject).length === 0) {
    return (
      <Spinner animation='border' role='status'>
        <span className='sr-only'>Loading...</span>
      </Spinner>
    );
  }
  else {
  let campaign=undefined
  Object.values(campaignObjects).map((c)=>{
    campaign=c
  });
  // for(let c of campaignObject) {
  //   campaign = c
  // }


  return (
    <Container fluid className='p-4'>
      <Row className='pb-4'>
        <Col md='3'>
          <Nav.Link
            style={{
              backgroundColor: "#83AC25",
              borderColor: "#83AC25",
            }}
            href={"/campaigns"}
            className='rounded-pill'>
            <i className='fas fa-arrow-left p-1'></i>
            Back to Campaigns
          </Nav.Link>
        </Col>
      </Row>
      <Row className='pb-2'>
        <Col md='3'></Col>
        <Col md='6'>
          <center>
            <h1>{campaign.title}</h1>
          </center>
        </Col>
        <Col md='3'></Col>
      </Row>
      <Row>
        <Col md='3'></Col>
        <Col md='6'>
          <div>
            <Table responsive>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Auto Facebook Post Mode</td>
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
          </div>
        </Col>
        <Col md='3'></Col>
      </Row>
    </Container>
  );
  }
}
