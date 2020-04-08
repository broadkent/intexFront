import React from "react";
import { Container } from "react-bootstrap";
import LottieControl from "./lottie";
import { Link } from "react-router-dom";

export default function Hero() {
  //!check
  return (
    <Container className='py-10  d-flex flex-column align-items-center'>
      <LottieControl />
      <div className='d-flex'>
        <Link
          to={"./campaigns"}
          block
          className='btn btn-light m-4 rounded-pill  align-content-center'
          style={{
            backgroundColor: "#83AC25",
            borderColor: "#FFFFFF",
            borderWidth: "5pt",
            width: "20rem",
            height: "4rem",
            color: "#FFFFFF",
            fontSize: "20pt",
            boxShadow: "3px 3px 0px #999999",
          }}
          size='lg'>
          ADMIN TOOL
        </Link>
        <Link
          to={"./training"}
          block
          className='btn btn-light m-4 rounded-pill  align-content-center font-weight-bold'
          style={{
            backgroundColor: "#FFFFFF	",
            borderColor: "#83AC25",
            borderWidth: "5pt",
            width: "20rem",
            height: "4rem",
            color: "#83AC25",
            fontSize: "20pt",
            boxShadow: "3px 3px 0px #999999",
          }}
          size='lg'>
          TRAINING
        </Link>
        <Link
          to={"./calculator"}
          block
          className='btn btn-light m-4 rounded-pill  align-content-center'
          style={{
            backgroundColor: "#83AC25",
            borderColor: "#FFFFFF",
            borderWidth: "5pt",
            width: "20rem",
            height: "4rem",
            color: "#FFFFFF",
            fontSize: "20pt",
            boxShadow: "3px 3px 0px #999999",
          }}
          size='lg'>
          USER TOOL
        </Link>
      </div>
      <br />
    </Container>
  );
}
