import React from "react";
import Lottie from "react-lottie";
import * as animationData from "./LottieJSONs/logo_animated.json";
import { Container } from "react-bootstrap";

export default class LottieControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isStopped: false, isPaused: false };
  }
  render() {
    const defaultOptions = {
      loop: false,
      autoplay: true,
      animationData: animationData.default,
      rendererSettings: {
        preserveAspectRatio: "xMidYmid slice",
      },
    };
    return (
      <Container>
        <Lottie options={defaultOptions} height={"30rem"} />
      </Container>
    );
  }
}
