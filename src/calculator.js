import React from "react";
import * as bs from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import LottiePerson from "./lottiePerson";
import LottieDollar from "./lottieDollar";
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe(...)

function Calculator(props) {
  // we'll add Stripe's Elements component here later
  return <CalculatorController />;
}
export default Calculator;

const CalculatorController = (props) => {
  const total = 50.0; // context.getCartTotal()
  const [donations_amnt, setDonationsAmnt] = React.useState("");
  const [donators, setDonators] = React.useState("");

  // Days Active
  // T/F has beneficiary
  // T/F creator is a charity
  // number of hearts
  // T/F visible in search
  // Goal $ to raise

  return (
    <Formik
      initialValues={{
        // daysActive: "90",
        beneficiary: "True",
        charity: "True",
        // hearts: "15",
        visibleSearch: "True",
        // goal: "1000",
      }}
      validateOnChange={false}
      validateOnBlur={false}
      validate={(values) => {
        const errors = {};

        return errors;
      }}
      onSubmit={async (values, actions) => {

        let data = {
          goal: values.goal,
          days_active: values.daysActive,
          has_beneficiary: values.beneficiary,
          visible_in_search: values.visibleSearch,
          campaign_hearts: values.hearts,
          is_charity: values.charity,
        };
        const api_header = {
          headers: {
            Authorization:
              "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTg2MzkyOTY4LCJqdGkiOiJmNjMzNjAxMTgxNzY0Zjc3YWRkNTc2NDU2MWNkMzVmMSIsInVzZXJfaWQiOjN9.L5PY-AozyJOSHyUD38x8rMnxKsrW74C00YwoazGTfi0",
          },
        };


        await axios.post("http://localhost:8000/api/prediction/", data, api_header).then(
          (response) => {

            const score = parseFloat(response.data);
            if (score === 0) {
              setDonationsAmnt("$0");
            } else if (score <= 1) {
              setDonationsAmnt("$1-$130");
            } else if (score <= 2) {
              setDonationsAmnt("$131-$635");
            } else if (score <= 3) {
              setDonationsAmnt("$636-$3332");
            } else if (score <= 4) {
              setDonationsAmnt("over $3332");
            }
          },
          (error) => {
            console.log(error);
          }
        );

        //DONATORS

        await axios.post("http://localhost:8000/api/predictiondonators/", data, api_header).then(
          (response) => {
            setDonators(parseInt(response.data));
          },
          (error) => {
            console.log(error);
          }
        );

        //Pause
        // setScore(null)
        // await new Promise(resolve => {
        //     setTimeout(() => {  // wait 2 seconds, then set the form as "not submitting"
        //         resolve()
        //     }, 2000)
        // })
        // console.log('after the 2 seconds')

        // const api_headers = {
        //   Authorization:
        //     "Bearer zY5Oie1v2gd8x7JUU+6t+eD06SSGIu3cSGLqJykxAKnI3fmvx3oTVwT9h8T9dGYZ5mqwfu/LswXXYCt3E1QKUQ==",
        //   "Content-Type": "application/json",
        // };
        // let data = {
        //   // "goal": values.goal,
        //   // "days_active": values.daysActive,
        //   // "has_beneficiary": values.beneficiary,
        //   // "visible_in_search": values.visibleSearch,
        //   // "campaign_hearts": values.hearts,
        //   // "is_charity": values.charity,

        //   Inputs: {
        //     input1: {
        //       ColumnNames: [
        //         "goal",
        //         "days_active",
        //         "has_beneficiary",
        //         "visible_in_search",
        //         "campaign_hearts",
        //         "is_charity",
        //       ],
        //       Values: [
        //         [
        //           values.goal,
        //           values.daysActive,
        //           values.beneficiary,
        //           values.visibleSearch,
        //           values.hearts,
        //           values.charity,
        //         ],
        //       ],
        //     },
        //   },
        //   GlobalParameters: {},
        // };
        // // setScore(null)
        // // await new Promise(resolve => {
        // //     setTimeout(() => {  // wait 2 seconds, then set the form as "not submitting"
        // //         resolve()
        // //     }, 2000)
        // // })
        // // console.log('after the 2 seconds')
        // console.log(data);
        // console.log(api_headers);
        // await axios
        //   .post("http://localhost:8000/api/prediction/", {
        //     goal: values.goal,
        //     days_active: values.daysActive,
        //     has_beneficiary: values.beneficiary,
        //     visible_in_search: values.visibleSearch,
        //     campaign_hearts: values.hearts,
        //     is_charity: values.charity,
        //   })
        //   .then(
        //     (response) => {
        //       console.log(response);
        //       console.log(response.data);

        //       const score = parseFloat(response.data);
        //       if (score === 0) {
        //         setScore("Your campaign will raise $0");
        //       } else if (score <= 1) {
        //         setScore("Your campaign will raise $1-$130");
        //       } else if (score <= 2) {
        //         setScore("Your campaign will raise $131-$635");
        //       } else if (score <= 3) {
        //         setScore("Your campaign will raise $636-$3332");
        //       } else if (score <= 4) {
        //         setScore("Your campaign will raise over $3332");
        //       }
        //     },
        //     (error) => {
        //       console.log(error);
        //     }
        //   );
      }}>
      {(form) => (
        <PaymentForm form={form} total={total} donators={donators} donations={donations_amnt} />
      )}
    </Formik>
  );
};

/**
 * The form layout/html
 */

// Days Active
// T/F has beneficiary
// T/F creator is a charity
// number of hearts
// T/F visible in search
// Goal $ to raise
const PaymentForm = (props) => (
  <bs.Container>
    <bs.Row
      className='justify-content-center lato font-weight-bolder dropshadow-white'
      style={{ display: "flex", padding: "2rem", color: "#83AC25", fontSize: "50pt" }}>
      prediction calculator
    </bs.Row>
    <bs.Row className='justify-content-center'>
      <bs.Card style={{ width: "50rem", padding: "2rem", paddingBottom: "7rem" }}>
        <bs.Card.Body>
          <Form>
            <bs.Row>
              <bs.Col>
                <Input title='Days Active:' name='daysActive' type='text' />
                <Input title='Number of hearts:' name='hearts' type='text' />
                <Input title='Goal $ to raise:' name='goal' type='text' />
                {/* <Input
                  title='Campaign has declared beneficiary (true/false):'
                  name='beneficiary'
                  type='text'
                /> */}
                {/* <Input
                  title='Campaign creator is a charity (true/false):'
                  name='charity'
                  type='text'
                /> */}
              </bs.Col>
              <bs.Col>
                <br />
                <label htmlFor='charity' style={{ fontSize: "15pt" }}>
                  Creator is a charity:
                </label>

                <Field
                  as='select'
                  name='charity'
                  style={{ height: "35px", position: "absolute", right: "30px" }}>
                  <option value='true'>True</option>
                  <option value='false'>False</option>
                </Field>

                <br />
                <br />
                <br />
                <label htmlFor='beneficiary' style={{ fontSize: "15pt" }}>
                  Has declared beneficiary:
                </label>

                <Field
                  as='select'
                  name='beneficiary'
                  style={{ height: "35px", position: "absolute", right: "30px" }}>
                  <option value='true'>True</option>
                  <option value='false'>False</option>
                </Field>

                <br />
                <br />
                <br />
                <label htmlFor='visibleSearch' style={{ fontSize: "15pt" }}>
                  Visible in search results:
                </label>

                <Field
                  as='select'
                  name='visibleSearch'
                  style={{ height: "35px", position: "absolute", right: "30px" }}>
                  <option value='true'>True</option>
                  <option value='false'>False</option>
                </Field>

                {/* <Input
                  title='Campaign is visible in search results (true/false):'
                  name='visibleSearch'
                  type='text'
                /> */}
              </bs.Col>
            </bs.Row>
            <bs.Row className='justify-content-center'>
              <bs.Col className='align-self-center d-flex'>
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
                    position: "absolute",
                    left: "75px",
                    bottom: "-95px",
                  }}
                  size='md'
                  disabled={props.form.isSubmitting}>
                  {props.form.isSubmitting && (
                    <bs.Spinner className='mr-2' size='sm' animation='border' />
                  )}
                  Estimate
                </bs.Button>
              </bs.Col>
              <bs.Col className='align-self-center font-weight-bold' style={{ fontSize: "15pt" }}>
                <bs.Container style={{ position: "absolute", right: "80px", bottom: "10" }}>
                  <LottieDollar />
                </bs.Container>
                <bs.Container style={{ position: "absolute", right: "-150px", bottom: "-40px" }}>
                  {props.donations} <br />
                </bs.Container>
                <bs.Container style={{ position: "absolute", right: "80px", bottom: "-100px" }}>
                  <LottiePerson />
                </bs.Container>
                <bs.Container style={{ position: "absolute", right: "-150px", bottom: "-90px" }}>
                  {props.donators}
                </bs.Container>
              </bs.Col>
            </bs.Row>
            <bs.Row></bs.Row>
            {/* form inputs */}
          </Form>
        </bs.Card.Body>
      </bs.Card>
    </bs.Row>
  </bs.Container>
);

/**
 * A form input.
 *   props.title - the title that shows above the input box
 *   props.type - the type of input (see React Bootstrap Form.Control)
 *   props.placeholder - placeholder text in the input
 */
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

// import React from 'react'
// import { Container, Row, Col } from 'react-bootstrap'
// import Hero from './hero'

// export default function Calculator() {
//     return(
//         <Container fluid className='p-4'>
//             <h1>Prediction Calculator</h1>
//             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
//         </Container>
//     )
// }
