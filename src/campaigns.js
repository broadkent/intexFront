import React from "react";
import * as bs from "react-bootstrap";
import CampaignCard from "./campaign-card";
import AppContext from "./context";
import Search from './search';
function Campaigns(props) {
  const context = React.useContext(AppContext);
  const campaignObjects = context.campaigns
  // console.log('campaignObjects', campaignObjects)

  if (!campaignObjects) {
    return (
      // <h2>Error: Campaign not found.</h2>
      <bs.Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </bs.Spinner>

    )
  }

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
          <bs.Card style={{ padding: "2rem" }}>
            <Search></Search>
          </bs.Card>
        </bs.Col>
        <bs.Col className='d-flex'>
          <bs.Col>
            <bs.Row>
              <bs.Container>
                {/* <CampaignCard /> */}
                {campaignObjects.map((campaign, campaignID) => (
                  <CampaignCard key={campaignID} campaign={campaign}/>
                ))}
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
export default Campaigns;
