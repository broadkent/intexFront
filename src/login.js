import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import * as bs from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import axios from "axios";

export default function Home() {
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
            console.log("submit", response);
            localStorage.setItem("accessToken", response.data.access);
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
  <Form>
    <bs.Container fluid className='p-4'>
      <bs.Row>
        <bs.Col>
          <center>
            <h1>Login</h1>

            <p>
              Credentials are given by admins of the gofundme website. Only on special basis may
              others have credentials.
            </p>
          </center>
        </bs.Col>
      </bs.Row>
      <bs.Row>
        <bs.Col md='2'></bs.Col>
        <bs.Col md='8'>
          <bs.Card>
            <bs.Card.Body>
              <Input title='Username' name='username' type='text' />
              <Input title='Password:' name='password' type='text' />
            </bs.Card.Body>
          </bs.Card>
        </bs.Col>
        <bs.Col md='2'></bs.Col>
      </bs.Row>
      <bs.Row className='justify-content-center'>
        <bs.Col md='6'>
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
        </bs.Col>
      </bs.Row>

      {/* form inputs */}
    </bs.Container>
  </Form>
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
