import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from '../../containers/Checkout/ContactData/ContactData';
import Modal from '../../components/UI/Modal/Modal';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../store/storeProps';

class Checkout extends Component {
    state = {
        continueButtonDisabled: false,
        ordering: false
    }
    checkoutCancelled = () => {
        this.props.history.goBack();
    }
    checkoutContinued = () => {
        this.setState({ continueButtonDisabled: true, ordering: true });
    }
    orderCancelHandler = () => {
        this.setState({ continueButtonDisabled: false, ordering: false });
    }
    render() {
        return (
            <div>
                <Modal show={this.state.ordering} modalClosed={this.orderCancelHandler} modalType="ModalForm">
                    <ContactData ingredients={this.props.ings} price={this.props.price} {...this.props}/>
                </Modal>
                <CheckoutSummary
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelled}
                    checkoutContinued={this.checkoutContinued}
                    isDisabled={this.state.continueButtonDisabled}
                />
                <Route path={this.props.match.path + '/react-burger-app/contact-data'}
                    component={ContactData} />
            </div>
        )
    }
}
export default connect(mapStateToProps)(Checkout);