import React from "react";
import Lottie from "react-lottie";
import * as animationData from "./LottieJSONs/person.json";
import { Container } from "react-bootstrap";

export default class LottiePerson extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isStopped: false, isPaused: false };
  }
  render() {
    const defaultOptions = {
      loop: false,
      autoplay: true,
      animationData: animationData.default,
      speed: 0.5,
      rendererSettings: {
        preserveAspectRatio: "xMidYmid slice",
      },
    };
    return (
      <Container>
        <Lottie options={defaultOptions} height={"50px"} />
      </Container>
    );
  }
}
