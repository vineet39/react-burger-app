import React, { Component } from 'react';
import Layout from '../src/components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckOut from './containers/Checkout/Checkout';
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Layout>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/checkout" component={CheckOut} />
      </Layout>
    );
  }
}

export default App;
