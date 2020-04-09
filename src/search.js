import React from "react";
import * as bs from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import AppContext from "./context";
import { BrowserRouter as Redirect } from "react-router-dom";

export default function Home() {
  const context = React.useContext(AppContext);
  const [prompt, setPrompt] = React.useState("");
  return (
    <bs.Container>
      <Formik
        initialValues={{
          title: "",
          description: "",
          campaignId: -1,
          risk: 0,
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validate={(values) => {
          const errors = {};
          return errors;
        }}
        onSubmit={async (values, actions) => {
          try {
            if (values.searchBy === "title") {
              var token = "JWT " + localStorage.getItem("accessToken");
              setPrompt("");
              const response = await axios.get(
                "http://127.0.0.1:8000/api/searchwordcampaigns/" +
                  values.searchBox +
                  "/" +
                  context.page,
                {
                  headers: {
                    Authorization: token,
                  },
                }
              );
              console.log(response.data);
              console.log(response.data.length);
              if (response.data.length == 0) {
                //console.log("no data here!")
                //console.log(prompt)
                //console.log("setting prompt")
                setPrompt("There are no campaigns that fit this criteria.")(
                  //console.log(prompt)
                  <Redirect to={{ pathname: "/campaigns" }} />
                );
              }
              console.log("response3da3", response);
              context.changeSearch(values.searchBy);
              context.changeSearchBox(values.searchBox);
              context.changeCampaigns(response.data);
            }
            if (values.searchBy === "description") {
              var token = "JWT " + localStorage.getItem("accessToken");
              setPrompt("");
              const response = await axios.get(
                "http://127.0.0.1:8000/api/SearchCampaignDesc/" +
                  values.searchBox +
                  "/" +
                  context.page,
                {
                  headers: {
                    Authorization: token,
                  },
                }
              );
              if (response.data.length == 0) {
                console.log("no data here!")
                //console.log(prompt)
                //console.log("setting prompt")
                setPrompt("There are no campaigns that fit this criteria")(
                  //console.log(prompt)
                  <Redirect to={{ pathname: "/campaigns" }} />
                );
              }
              console.log("response3da3", response);
              context.changeSearch(values.searchBy);
              context.changeSearchBox(values.searchBox);
              context.changeCampaigns(response.data);
            }
            if (values.searchBy === "campaignId") {
              setPrompt("");
              const token = "JWT " + localStorage.getItem("accessToken");
              const response = await axios.get(
                "http://127.0.0.1:8000/api/searchcampaigns/" + values.searchBox,
                {
                  headers: {
                    Authorization: token,
                  },
                }
              );
              if (response.data.length == 0) {
                console.log("no data here!")
                //console.log(prompt)
                //console.log("setting prompt")
                setPrompt("There are no campaigns that fit this criteria")(
                  //console.log(prompt)
                  <Redirect to={{ pathname: "/campaigns" }} />
                );
              }
              context.changeSearch(values.searchBy);
              context.changeSearchBox(values.searchBox);
              context.changeCampaigns(response.data);
            }
            if (
              values.searchBy === "risk" &&
              parseInt(values.searchBox) > 0 &&
              parseInt(values.searchBox) < 5
            ) {
              //!check the risk level
              let riskNum = parseInt(values.searchBox);
              var token = "JWT " + localStorage.getItem("accessToken");
              setPrompt("");
              const response = await axios.get(
                "http://127.0.0.1:8000/api/sortRisk/" + riskNum + "/" + context.page,
                {
                  headers: {
                    Authorization: token,
                  },
                }
              );
              if (response.data.length == 0) {
                console.log("no data here!")
                //console.log(prompt)
                //console.log("setting prompt")
                setPrompt("There are no campaigns that fit this criteria")(
                  //console.log(prompt)
                  <Redirect to={{ pathname: "/campaigns" }} />
                );
              }
              context.changeSearch(values.searchBy);
              context.changeSearchBox(riskNum);
              context.changeCampaigns(response.data);
            }
          } catch (err) {
            actions.setFieldError("title", err);
          }
        }}>
        {(form) => <PaymentForm form={form} prompt={prompt} />}
      </Formik>
    </bs.Container>
  );
}

const PaymentForm = (props) => (
  <bs.Container>
    <bs.Row className='justify-content-center'>
      <bs.Card style={{ padding: "3rem", height: "20rem" }}>
        <Form>
          <bs.Row className='justify-content-center'>
            {/* <Input title='title' name='title' type='text' />
            <Input title='description' name='description' type='text' />
            <Input title='campaignId' name='campaignId' type='text' />
            <Input title='risk' name='risk' type='text' /> */}
            <Input title='Search:' name='searchBox' type='text' />
            <Field title='Search By:' as='select' name='searchBy' style={{ width: "12rem" }}>
              <option>Choose a Filter</option>
              <option value='title'>Title</option>
              <option value='description'>Description</option>
              <option value='campaignId'>Campaign ID</option>
              <option value='risk'>Fraud Risk Level</option>
            </Field>
          </bs.Row>
          <bs.Container
            style={{ color: "#ff0000", position: "absolute", left: "18px", width: "14rem" }}>
            {props.prompt}
          </bs.Container>
          <bs.Row className='justify-content-center' style={{ paddingTop: "2rem" }}>
            <bs.Button
              block
              className='m-4 rounded-pill font-weight-bold'
              type='submit'
              style={{
                backgroundColor: "#FFFFFF	",
                borderColor: "#83AC25",
                borderWidth: "4pt",
                width: "10rem",
                height: "3rem",
                color: "#83AC25",
                boxShadow: "3px 3px 0px #999999",
              }}
              size='md'
              disabled={props.form.isSubmitting}>
              {props.form.isSubmitting && (
                <bs.Spinner className='mr-2' size='sm' animation='border' />
              )}
              Submit
            </bs.Button>
          </bs.Row>

          {/* form inputs */}
        </Form>
      </bs.Card>
    </bs.Row>
  </bs.Container>
);
const Input = (props) => (
  <Field name={props.name}>
    {(rProps) => (
      <bs.Form.Group>
        {props.title && <bs.Form.Label>{props.title}</bs.Form.Label>}
        <bs.Form.Control type={props.type} placeholder={props.placeholder} {...rProps.field} />
        {rProps.meta.touched && rProps.meta.error && (
          <div className='text-danger'>{rProps.meta.error}</div>
        )}
      </bs.Form.Group>
    )}
  </Field>
);
