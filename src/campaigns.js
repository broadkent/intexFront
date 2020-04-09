import React, { useState, useEffect  } from 'react'
import * as bs from "react-bootstrap";
import CampaignCard from "./campaign-card";
import AppContext from "./context";
import Search from "./search";
import Axios from 'axios'

function Campaigns(props) {
  
  let [campaignObjects,setcampaigns] = React.useState({})
  useEffect(async()=>{
    var token = "JWT " + localStorage.getItem("accessToken");
    const resp = await Axios.get('http://127.0.0.1:8000/api/campaign/'+0,{ headers: {
      Authorization: token,
    }})
    const prods = {}
    for ( const c of resp.data){
        prods[c.pk] =c.fields
    }
    setcampaigns(prods)  
  },[])
  if (Object.keys(campaignObjects).length ==0) {
    return (
      // <h2>Error: Campaign not found.</h2>
      <bs.Spinner animation='border' role='status'>
        <span className='sr-only'>Loading...</span>
      </bs.Spinner>
    );
  } else {

  return (
    <bs.Container>
      <bs.Row
        className='justify-content-center lato font-weight-bolder dropshadow-white'
        style={{ display: "flex", padding: "2rem", color: "#83AC25", fontSize: "50pt" }}>
        campaigns
      </bs.Row>
      <bs.Row
        style={{ display: "flex", flexDirection: "row" }}
        noGutters
        className='flex-grow-0 flex-shrink-0'>
        <bs.Col md={3} className='d-flex'>
          <Search />
        </bs.Col>
        <bs.Col className='d-flex'>
          <bs.Col>
            <bs.Row>
              <bs.Container>
                {/* <CampaignCard /> */}
                {Object.values(campaignObjects).map((campaign, campaignID) =>{ 
                  return (<CampaignCard key={campaignID} campaign={campaign} />)
                })} 
              </bs.Container>
            </bs.Row>
            <bs.Row className='justify-content-end'>
              <bs.Button
                block
                className='m-4 rounded-pill font-weight-bold'
                style={{
                  backgroundColor: "#FFFFFF	",
                  borderColor: "#83AC25",
                  borderWidth: "4pt",
                  width: "10rem",
                  height: "3rem",
                  color: "#83AC25",
                  boxShadow: "3px 3px 0px #999999",
                }}
                size='md'>
                MORE
              </bs.Button>
            </bs.Row>
          </bs.Col>
        </bs.Col>
      </bs.Row>
    </bs.Container>
  );
  }
}
export default Campaigns;
