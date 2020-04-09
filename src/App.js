import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
//import all the components
import TopContainer from "./top-container";
import FooterContainer from "./footer-container";
import Home from "./home";
import Calculator from "./calculator";
import CampaignDetail from "./campaign-detail";
import Campaigns from "./campaigns";
import Training from "./training";
import Login from "./login";
import decode from 'jwt-decode'

const checkAuth = () => {
  const token = "JWT" + localStorage.getItem('accessToken')
  const refreshToken = localStorage.getItem('refreshToken')
  if (!token || !refreshToken){
    return false
  }
  try {
    const { exp } = decode(refreshToken)

    if (exp * 1000 < new Date().getTime()) {
      return false;
    }
  }catch(error){
    return false;
  }

  return true;
}

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    checkAuth() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/login'}} />
    )
  )} />
)


function App() {
  return (
    <Router>
      <Container fluid className='p-0 m-0 min-vh-100 d-flex flex-column'>
        <Row noGutters className='flex-grow-0 flex-shrink-0'>
          <Col className='px-3 py-2' style={{ backgroundColor: "#fff" }}>
            <TopContainer />
          </Col>
        </Row>
        <Row noGutters className='flex-grow-1'>
          <Col md='12' style={{ backgroundColor: "#F3F3F3" }}>
            <Switch>
             
              <Route path='/campaigns/:campaignID'>
                <CampaignDetail />
              </Route>
              <AuthRoute path='/calculator'>
                
                <Calculator />
              </AuthRoute>
              <AuthRoute exact path="/campaigns" component={Campaigns}/>
              <Route path='/training'>
                <Training />
              </Route>
              <Route path='/login'>
                <Login />
              </Route>
              <Route path='/'>
                <Home />
              </Route>
             
            </Switch>
          </Col>
        </Row>
        <Row noGutters className='flex-grow-0 flex-shrink-0'>
          <Col className='px-3 py-2 bg-fourth'>
            <FooterContainer />
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
