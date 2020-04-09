import React from "react";
import { Container } from "react-bootstrap";
import * as bs from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import axios from "axios";
//import { useHistory } from "react-router-dom";

import LottieLock from "./lottieLock";

export default function Home() {
  
  //let history = useHistory();
  return (
    <Container>
      <Formik
        initialValues={{
          username: "m3e",
          password: "memememe",
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validate={(values) => {
          const errors = {};
          if (values.username === "") {
            errors.username = "You need a value for your username.";
          }
          if (values.password === "") {
            errors.password = "You need a value for your password.";
          }
          console.log("validating", values);
          return errors;
        }}
        onSubmit={async (values, actions) => {
          try {
            const response = await axios.post("http://127.0.0.1:8000/api/token/", {
              username: values.username,
              password: values.password,
            });
            console.log("submit", response.data);
            localStorage.setItem("accessToken", response.data.access);
            //localStorage.setItem("refreshToken", response.data.refresh);
            //history.push('/campaigns')
          } catch (err) {
            const err1 = err.toString();
            if (err1.search("401")) {
              actions.setFieldError("username", "Your username and/or password is incorrect.");
            } else {
              console.error(err);
              actions.setFieldError("username", err);
            }
          }
        }}>
        {(form) => <PaymentForm form={form} />}
      </Formik>
    </Container>
  );
}

const PaymentForm = (props) => (
  <bs.Container>
    <bs.Row
      className='justify-content-center lato font-weight-bolder dropshadow-white'
      style={{ display: "flex", padding: "2rem", color: "#83AC25", fontSize: "50pt" }}>
      login
    </bs.Row>
    <bs.Row className='justify-content-center'>
      <bs.Card style={{ padding: "3rem" }}>
        <LottieLock />
        <Form>
          <bs.Row>
            <bs.Col>
              <bs.Card.Body>
                <Input title='Username' name='username' type='text' />
                <Input title='Password:' name='password' type='text' />
              </bs.Card.Body>
            </bs.Col>
          </bs.Row>
          <bs.Row className='justify-content-center' style={{ paddingTop: "5px" }}>
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
          <br />
          <p style={{ color: "#83AC25", fontSize: "10pt" }} className='font-weight-bold'>
            Credentials are given by admins of the gofundme website.
          </p>
          <p style={{ color: "#83AC25", fontSize: "10pt" }} className='font-weight-bold'>
            Only on special basis may others have credentials.
          </p>

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
