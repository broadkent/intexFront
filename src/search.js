import React from "react";
import * as bs from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import axios from "axios";

export default function Home() {
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
          console.log("validating", values);
          return errors;
        }}
        onSubmit={async (values, actions) => {
          console.log("insubmit");
          try {
            if (values.searchBy == "title") {
              console.log("white");
              var token = "JWT " + localStorage.getItem("accessToken");
              const response = await axios.get(
                "http://127.0.0.1:8000/api/searchwordcampaigns/" + values.searchBox + "/" + 0,
                {
                  headers: {
                    Authorization: token,
                  },
                }
              );
              console.log("response", response.data);
            }
            if (values.searchBy == "description") {
              console.log("whites");
              var token = "JWT " + localStorage.getItem("accessToken");
              const response = await axios.get(
                "http://127.0.0.1:8000/api/SearchCampaignDesc/" + values.searchBox + "/" + 0,
                {
                  headers: {
                    Authorization: token,
                  },
                }
              );
              console.log("response", response.data);
            }
            if (values.searchBy == "campaignId") {
              console.log("white");
              var token = "JWT " + localStorage.getItem("accessToken");
              const response = await axios.get(
                "http://127.0.0.1:8000/api/searchcampaigns/" + values.searchBox,
                {
                  headers: {
                    Authorization: token,
                  },
                }
              );
              console.log("response", response.data);
            }
            if (
              values.searchBy == "risk" &&
              parseInt(values.searchBox) > 0 &&
              parseInt(values.searchBox) < 5
            ) {
              //!check the risk level
              console.log("white");
              let riskNum = parseInt(values.searchBox);
              var token = "JWT " + localStorage.getItem("accessToken");
              const response = await axios.get(
                "http://127.0.0.1:8000/api/sortRisk/" + riskNum + "/" + 0,
                {
                  headers: {
                    Authorization: token,
                  },
                }
              );
              console.log("response", response.data);
            }
          } catch (err) {
            actions.setFieldError("title", err);
          }
        }}>
        {(form) => <PaymentForm form={form} />}
      </Formik>
    </bs.Container>
  );
}

const PaymentForm = (props) => (
  <bs.Container>
    <bs.Row className='justify-content-center'>
      <bs.Card style={{ padding: "3rem", height: "19rem" }}>
        <Form>
          <bs.Row className='justify-content-center'>
            {/* <Input title='title' name='title' type='text' />
            <Input title='description' name='description' type='text' />
            <Input title='campaignId' name='campaignId' type='text' />
            <Input title='risk' name='risk' type='text' /> */}
            <Input title='Search:' name='searchBox' type='text' />
            <Field title='Search By:' as='select' name='searchBy' style={{ width: "12rem" }}>
              <option value='title'>Title</option>
              <option value='description'>Description</option>
              <option value='campaignId'>Campaign ID</option>
              <option value='risk'>Fraud Risk Level</option>
            </Field>
          </bs.Row>
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
