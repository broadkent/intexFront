import React, { useEffect } from "react";
import * as bs from "react-bootstrap";
import CampaignCard from "./campaign-card";
import AppContext from "./context";
import Search from "./search";
import Axios from "axios";
function Campaigns(props) {
  const context = React.useContext(AppContext);
  console.log("page", context);
  useEffect(() => {
    async function hello() {
    console.log("useeffect");
    let resp = "";
    const token = "JWT " + localStorage.getItem("accessToken");
    resp = await Axios.get("/api/campaign/" + 0, {
      headers: {
        Authorization: token,
      },
    });
    context.changeCampaigns(resp.data);}
    hello()
  }, []);
  const GetMoreItems = async () => {
    context.changepage(10);
    let resp;
    const token = "JWT " + localStorage.getItem("accessToken");
    if (context.search == "default") {
      console.log("default", context.page);
      resp = await Axios.get("/api/campaign/" + context.page, {
        headers: {
          Authorization: token,
        },
      });
    } else if (context.search == "title") {
      console.log("title");
      try {
        resp = await Axios.get(
          "/api/searchwordcampaigns/" + context.searchBox + "/" + context.page,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log(resp.data);
        console.log(resp.data.length);
        if (resp.data.length == 0) {
          console.log("no data");
        }
      } catch (err) {
        console.log(err);
      }
    } else if (context.search == "description") {
      resp = await Axios.get(
        "/api/SearchCampaignDesc/" + context.searchBox + "/" + context.page,
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } else if (context.search == "risk") {
      resp = await Axios.get(
        "/api/sortRisk/" + context.searchBox + "/" + context.page,
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } else if (context.search == "campaignId") {
      resp = await Axios.get("/api/searchcampaigns/" + context.searchBox, {
        headers: {
          Authorization: token,
        },
      });
    } else {
      console.log("made it to the end");
    }
    console.log("resp111", resp);
    context.changeCampaigns(resp.data);
  };
  const PageBack = async () => {
    context.pageback(10);
    let resp;
    const token = "JWT " + localStorage.getItem("accessToken");
    if (context.search == "default") {
      console.log("default", context.page);
      resp = await Axios.get("/api/campaign/" + context.page, {
        headers: {
          Authorization: token,
        },
      });
    } else if (context.search == "title") {
      console.log("title");
      resp = await Axios.get(
        "/api/searchwordcampaigns/" + context.searchBox + "/" + context.page,
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } else if (context.search == "description") {
      resp = await Axios.get(
        "/api/SearchCampaignDesc/" + context.searchBox + "/" + context.page,
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } else if (context.search == "risk") {
      resp = await Axios.get(
        "/api/sortRisk/" + context.searchBox + "/" + context.page,
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } else if (context.search == "campaignId") {
      resp = await Axios.get("/api/searchcampaigns/" + context.searchBox, {
        headers: {
          Authorization: token,
        },
      });
    } else {
      console.log("made it to the end");
    }
    console.log("resp111", resp);
    context.changeCampaigns(resp.data);
  };
  const resp = context.campaigns;
  const prods = {};
  for (const c of resp) {
    prods[c.pk] = c.fields;
  }
  if (Object.keys(prods).length == 0) {
    console.log("redirecting...");
    return (
      <bs.Container>
      <bs.Row
        className='justify-content-center lato font-weight-bolder dropshadow-white'
        style={{ display: "flex", padding: "2rem", color: "#83AC25", fontSize: "50pt" }}>
        campaigns
      </bs.Row>
      <bs.Row>
        {props.prompt}
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
                {Object.values(prods).map((campaign, campaignID) =>{ 
                  return (<CampaignCard key={campaignID} campaign={campaign} />)
                })} 
              </bs.Container>
            </bs.Row>
            <bs.Row >
              <h4><center>No more campaigns to show</center></h4>
            </bs.Row>
            <bs.Row>
              <bs.Button
                  onClick={() => PageBack()}
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
                  Back
                </bs.Button>
            </bs.Row>
          </bs.Col>
        </bs.Col>
      </bs.Row>
    </bs.Container>
    );
  } else {
    return (
      <bs.Container>
        <bs.Row
          className='justify-content-center lato font-weight-bolder dropshadow-white'
          style={{ display: "flex", padding: "2rem", color: "#83AC25", fontSize: "50pt" }}>
          campaigns
        </bs.Row>
        <bs.Row>{props.prompt}</bs.Row>
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
                  {Object.values(prods).map((campaign, campaignID) => {
                    return <CampaignCard key={campaignID} campaign={campaign} />;
                  })}
                </bs.Container>
              </bs.Row>
              <bs.Row className='justify-content-end'>
                <bs.Button
                  onClick={() => PageBack()}
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
                  Back
                </bs.Button>
                <bs.Button
                  onClick={() => GetMoreItems()}
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
                  More
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





