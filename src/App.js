import React, { useEffect } from 'react';
import Layout from '../src/components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckOut from './containers/Checkout/Checkout';
import { Route, withRouter } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout';
import { connect } from 'react-redux';
import * as authActionTypes from './store/actions/auth';

const app = props => {
  useEffect(() => {
    props.checkAuthState();
  }, [])
    return (
      <Layout>
        <Route path="/react-burger-app/burgerBuilder" component={BurgerBuilder} />
        <Route path="/react-burger-app/" exact component={Auth} />
        <Route path="/" exact component={Auth} />
        <Route path="/react-burger-app/checkout" component={CheckOut} />
        <Route path="/react-burger-app/orders" component={Orders} />
        <Route path="/react-burger-app/auth" component={Auth} />
        <Route path="/react-burger-app/logout" component={Logout} />
      </Layout>
    );
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app));
