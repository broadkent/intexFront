import React from "react";
import * as bs from "react-bootstrap";
import CampaignCard from "./campaign-card";
import { useRouteMatch } from "react-router-dom";
import AppContext from "./context";
import { Formik, Form, Field } from "formik";

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
          <bs.Card style={{ padding: "2rem"}} className="mb-4" border='light'>
            <iframe
              width='1024'
              height='576'
              src='https://www.youtube.com/embed/XhD1F6_fRLc'
              frameborder='0'
              allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
              allowfullscreen></iframe>
          </bs.Card>
        </bs.Col>
      </bs.Row>
    </bs.Container>
  );
}
export default Training;
