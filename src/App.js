import React, { Component } from 'react';
import Layout from '../src/components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckOut from './containers/Checkout/Checkout';
import { Route, withRouter } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout';
import { connect } from 'react-redux';
import * as authActionTypes from './store/actions/auth';

class App extends Component {
  componentDidMount(){
    this.props.checkAuthState();
  }
  render() {
    return (
      <Layout>
        <Route path="/burgerBuilder" component={BurgerBuilder} />
        <Route path="/" exact component={Auth} />
        <Route path="/checkout" component={CheckOut} />
        <Route path="/orders" component={Orders} />
        <Route path="/auth" component={Auth} />
        <Route path="/logout" component={Logout} />
      </Layout>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuth: state.authReducer.token != null
  }
}
const mapDispatchToProps = dispatch => {
  return {
    checkAuthState: () => dispatch(authActionTypes.checkAuthState())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
