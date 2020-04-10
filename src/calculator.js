import React from "react";
import * as bs from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import LottiePerson from "./lottiePerson";
import LottieDollar from "./lottieDollar";
function Calculator(props) {
  return <CalculatorController />;
}
export default Calculator;
const CalculatorController = (props) => {
  const total = 50.0; // context.getCartTotal()
  const [donations_amnt, setDonationsAmnt] = React.useState("");
  const [donators, setDonators] = React.useState("");
  return (
    <Formik
      initialValues={{
        daysActive: "0",
        beneficiary: "True",
        charity: "True",
        hearts: "0",
        visibleSearch: "True",
        goal: "0",
      }}
      validateOnChange={false}
      validateOnBlur={false}
      validate={(values) => {
        const errors = {};
        if (!values.daysActive.match(/^[0-9]+$/)) {
          errors.daysActive = 'Enter a number';
        }
        if (!values.hearts.match(/^[0-9]+$/)) {
          errors.hearts = 'Enter a number';
        }
        if (!values.goal.match(/^[0-9]+$/)) {
          errors.goal = 'Enter a number';
        }
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
        await axios.post("/api/prediction/", data).then(
          (response) => {
            const score = parseFloat(response.data);
            if (values.daysActive == 0){
              setDonationsAmnt("less than $15");
              setDonators("0")
            }
            if (score === 0) {
              setDonationsAmnt("less than $15");
            } else if (score <= 0.5) {
              setDonationsAmnt("$15-$80");
            } else if (score <= 1) {
              setDonationsAmnt("$81-$130");
            } else if (score <= 1.5) {
              setDonationsAmnt("$131-$383");
            } else if (score <= 2) {
              setDonationsAmnt("$384 - $636");
            } else if (score <= 2.33) {
              setDonationsAmnt("$637-$1536");
            } else if (score <= 2.66) {
              setDonationsAmnt("$1537-$2432");
            } else if (score <= 3) {
              setDonationsAmnt("$2433-$3330");
            } else if (score <= 4) {
              setDonationsAmnt("over $3330");
            }
          },
          (error) => {
            console.log(error);
          }
        );
        //DONATORS
        await axios.post("/api/predictiondonators/", data).then(
          (response) => {
            if (values.daysActive == 0){
              setDonators("0")
            }
            else{
              setDonators(parseInt(response.data));
            }
          },
          (error) => {
            console.log(error);
          }
        );
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
          <h6><strong>Fill out the form with your GoFundMe campaign characteristics.</strong></h6>
          <p>This prediction calculator is backed by powerful algorithms designed by GoFundMe data scientists.
          The calculator will help you determine what changes you need to make to reach your campaign goals.
          After processing your information, you will see the projected donation amount and number of donators
        in the bottom right corner.</p>
          <br />
          <Form>
            <bs.Row>
              <bs.Col>
                <Input title='Days Active:' name='daysActive' type='text' />
                <Input title='Number of hearts:' name='hearts' type='text' />
                <Input title='Goal $ to raise:' name='goal' type='text' />
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
          </Form>
        </bs.Card.Body>
      </bs.Card>
    </bs.Row>
    <bs.Row className='pt-4 px-5 justify-content-center'>
      <strong><h5 >Form Descriptions</h5></strong>
    </bs.Row>
    <bs.Row className='px-5 justify-content-center'>
      <ul>
        <li><strong>Days active:</strong> Number of days your campaign is open for</li>
        <li><strong>Number of hearts:</strong> Number of  "likes" your campaign has gotten</li>
        <li><strong>Goal $ to raise:</strong> The donation goal that is publicly visible on your campaign</li>
        <li><strong>Creator is a charity:</strong> Is the campaign in behalf of a charity?</li>
        <li><strong>Has declared beneficiary:</strong> Does the campaign declare a beneficiary?</li>
        <li><strong>Visible in search results:</strong> Is the campaign set to be seen publicly?</li>
      </ul>
    </bs.Row>
    <bs.Row className='justify-content-center' style={{ paddingTop: "2rem" }}>
      <bs.Nav.Link
        style={{
          backgroundColor: "#83AC25	",
          borderColor: "#FFFFFF",
          borderWidth: "4pt",
          width: "15rem",
          height: "3rem",
          color: "#FFFFFF",
          boxShadow: "3px 3px 0px #999999",
        }}
        href={"/"}
        className='btn m-4 rounded-pill font-weight-bold'>
        <i className='fas fa-arrow-left p-1'></i>
        Back to Home
      </bs.Nav.Link>
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





