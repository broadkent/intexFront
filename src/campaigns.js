import React, { useState, useEffect } from "react";
import * as bs from "react-bootstrap";
import CampaignCard from "./campaign-card";
import AppContext from "./context";
import Search from "./search";
import Axios from "axios";
// import { BrowserRouter as Redirect } from "react-router-dom";
// import { useHistory, Link } from "react-router-dom";

let page = 0;
function Campaigns(props) {
  const context = React.useContext(AppContext);
  // const [prompt, setPrompt] = React.useState("False");

  console.log("page", context);
  useEffect(async () => {
    console.log("useeffect");
    let resp = "";
    const token = "JWT " + localStorage.getItem("accessToken");

    resp = await Axios.get("http://127.0.0.1:8000/api/campaign/" + 0, {
      headers: {
        Authorization: token,
      },
    });

    context.changeCampaigns(resp.data);
  }, []);
  const GetMoreItems = async () => {
    context.changepage(10);
    let resp;
    const token = "JWT " + localStorage.getItem("accessToken");
    if (context.search == "default") {
      console.log("default", context.page);
      resp = await Axios.get("http://127.0.0.1:8000/api/campaign/" + context.page, {
        headers: {
          Authorization: token,
        },
      });
    } else if (context.search == "title") {
      console.log("title");
      try {
        resp = await Axios.get(
          "http://127.0.0.1:8000/api/searchwordcampaigns/" + context.searchBox + "/" + context.page,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log(resp.data);
        console.log(resp.data.length);
        //console.log(resp.data[0].pk)
        if (resp.data.length == 0) {
          //   // console.log(resp.data.length)
          console.log("no data");

          //   // console.log(prompt)
          //   // console.log("setting prompt")

          //   // // console.log(prompt)
          // history.push("/login")
          // (<Redirect to={{ pathname: '/prediction'}} />)
        }
      } catch (err) {
        console.log(err);
      }
    } else if (context.search == "description") {
      resp = await Axios.get(
        "http://127.0.0.1:8000/api/SearchCampaignDesc/" + context.searchBox + "/" + context.page,
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } else if (context.search == "risk") {
      resp = await Axios.get(
        "http://127.0.0.1:8000/api/sortRisk/" + context.searchBox + "/" + context.page,
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } else if (context.search == "campaignId") {
      resp = await Axios.get("http://127.0.0.1:8000/api/searchcampaigns/" + context.searchBox, {
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
      resp = await Axios.get("http://127.0.0.1:8000/api/campaign/" + context.page, {
        headers: {
          Authorization: token,
        },
      });
    } else if (context.search == "title") {
      console.log("title");
      resp = await Axios.get(
        "http://127.0.0.1:8000/api/searchwordcampaigns/" + context.searchBox + "/" + context.page,
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } else if (context.search == "description") {
      resp = await Axios.get(
        "http://127.0.0.1:8000/api/SearchCampaignDesc/" + context.searchBox + "/" + context.page,
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } else if (context.search == "risk") {
      resp = await Axios.get(
        "http://127.0.0.1:8000/api/sortRisk/" + context.searchBox + "/" + context.page,
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } else if (context.search == "campaignId") {
      resp = await Axios.get("http://127.0.0.1:8000/api/searchcampaigns/" + context.searchBox, {
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
    // (<Redirect to={{ pathname: '/login'}} />)
    return (
      //   // <h2>Error: Campaign not found.</h2>
      <bs.Spinner animation='border' role='status'>
        <span className='sr-only'>Loading...</span>
      </bs.Spinner>
      //   // history.push("/campaigns")
      //   // <Redirect to={{ pathname: '/login'}} />
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
                  {/* <CampaignCard /> */}
                  {Object.values(prods).map((campaign, campaignID) => {
                    return <CampaignCard key={campaignID} campaign={campaign} />;
                  })}
                </bs.Container>
              </bs.Row>
              <bs.Row className='justify-content-end'>
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
