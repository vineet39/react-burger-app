import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from '../../containers/Checkout/ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1
        }
    }
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.abc);
        const ingredients = {};
        for (let i of query.entries()) {
            console.log(i);
            ingredients[i[0]] = +i[1];
        }
        this.setState({ingredients: ingredients});
    }
    checkoutCancelled = () => {
        this.props.history.goBack();
    }
    checkoutContinued = () => {
        this.props.history.replace('checkout/contact-data');
    }
    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelled}
                    checkoutContinued={this.checkoutContinued}
                />
                <Route path={this.props.match.path + '/contact-data'} 
                       render={() => (<ContactData ingredients={this.state.ingredients} />)} />
            </div>
        )
    }
}

export default Checkout;