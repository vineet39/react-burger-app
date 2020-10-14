import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from '../../containers/Checkout/ContactData/ContactData';
import Modal from '../../components/UI/Modal/Modal';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1
        },
        price: 0,
        continueButtonDisabled: false,
        ordering: false
    }
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.abc);
        console.log("Query string " + query);
        const ingredients = {};
        for (let i of query.entries()) {
            console.log(i);
            if (i[0] != "price")
                ingredients[i[0]] = +i[1];
            else
                this.setState({ price: +i[1] });
        }
        this.setState({ ingredients: ingredients });
    }
    checkoutCancelled = () => {
        this.props.history.goBack();
    }
    checkoutContinued = () => {
        this.setState({ continueButtonDisabled: true, ordering: true });
        // this.props.history.replace('checkout/contact-data');
    }
    orderCancelHandler = () => {
        this.setState({ continueButtonDisabled: false, ordering: false });
    }
    render() {
        return (
            <div>
                <Modal show={this.state.ordering} modalClosed={this.orderCancelHandler} modalType="ModalForm">
                    <ContactData ingredients={this.state.ingredients} price={this.state.price} {...this.props}/>
                </Modal>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelled}
                    checkoutContinued={this.checkoutContinued}
                    isDisabled={this.state.continueButtonDisabled}
                />
                <Route path={this.props.match.path + '/contact-data'}
                    render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.price} />)} />
            </div>
        )
    }
}

export default Checkout;