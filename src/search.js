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
          title: "",
          description: "",
          campaignId:-1,
          risk:0

        }}
        validateOnChange={false}
        validateOnBlur={false}
        validate={(values) => {
          const errors = {};
          console.log("validating", values);
          return errors;
        }}
        onSubmit={async (values, actions) => {
            console.log('insubmit')
          try {
            if(values.title != ''){
                console.log('white')
                var token="JWT "+ localStorage.getItem('accessToken');
                const response = await axios.get('http://127.0.0.1:8000/api/searchwordcampaigns/'+values.title+'/'+0,{
                  headers: {
                      "Authorization": token,
                  }})
                console.log('response',response.data)
            }
            if(values.description !=''){
                console.log('whites')
                var token="JWT "+ localStorage.getItem('accessToken');
                const response = await axios.get('http://127.0.0.1:8000/api/SearchCampaignDesc/'+values.description+'/'+0,{
                headers: {
                    "Authorization": token,
                }})
                console.log('response',response.data)
            }
            if(values.campaignId >-1){
                console.log('white')
                var token="JWT "+ localStorage.getItem('accessToken');
                const response = await axios.get('http://127.0.0.1:8000/api/searchcampaigns/'+values.campaignId,{
                  headers: {
                      "Authorization": token,
                  }})
                  console.log('response',response.data)
            }
            if(values.risk>0 && values.risk<5){
              console.log('white')
              var token="JWT "+ localStorage.getItem('accessToken');
              const response = await axios.get('http://127.0.0.1:8000/api/sortRisk/'+values.risk+'/'+0,{
                headers: {
                    "Authorization": token,
                }})
                console.log('response',response.data)
            }
            
          
          } catch (err) {
            actions.setFieldError("title", err);
          }
        }}>
        {(form) => <PaymentForm form={form} />}
      </Formik>
    </Container>
  );
}

const PaymentForm = (props) => (
  <bs.Container>
    <bs.Row className='justify-content-center'>
      <bs.Card style={{ padding: "3rem" }}>
        <Form>
          <bs.Row>
            <bs.Col>
              <bs.Card.Body>
                <Input title='title' name='title' type='text' />
                <Input title='description' name='description' type='text' />
                <Input title='campaignId' name='campaignId' type='text' />
                <Input title='risk' name='risk' type='text' />
              </bs.Card.Body>
            </bs.Col>
          </bs.Row>
          <bs.Row className='justify-content-center'>
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
