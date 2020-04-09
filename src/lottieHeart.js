import React from "react";
import Lottie from "react-lottie";
import * as heartData from "./LottieJSONs/heart.json";
import { Container } from "react-bootstrap";

export default class LottieHeart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isStopped: false, isPaused: false };
  }
  render() {
    const defaultOptions = {
      loop: false,
      autoplay: true,
      animationData: heartData.default,
      rendererSettings: {
        preserveAspectRatio: "xMidYmid slice",
      },
    };
    return (
      <Container>
        <Lottie options={defaultOptions} height={"80px"} />
      </Container>
    );
  }
}
