import React, { Component } from "react";
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import instance from '../../axois-orders';
import ErrorHandler from '../../hoc/Errorhandler/ErrorHandler';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../store/storeProps';
import { mapDispatchToProps } from '../../store/storeProps';
import Spinner from '../../components/UI/Spinner/Spinner';

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }
    componentDidMount() {
        this.props.onInitIngredient();
    }
    checkIfPurchasable() {
        const ingredients = this.props.ings;
        for (var key in ingredients) {
            if (ingredients.hasOwnProperty(key)) {
                if (ingredients[key] > 0) {
                    return true;
                }
            }
        }
        return false;
    }
    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }
    purchaseContinueHandler = () => {
        if(this.props.isAuth)
            this.props.history.push('/checkout')
        else
            this.props.history.push('/')
    }
    render() {
        const disabledInfo = { ...this.props.ings };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = <Spinner />;

        if (this.props.error) {
            burger = <Modal show={this.props.error}>Try refreshing the page</Modal>
        }

        if (this.props.ings && !this.props.error && this.props.loaded) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.checkIfPurchasable()}
                        ordered={this.purchaseHandler}
                        price={this.props.price} />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(BurgerBuilder, instance));
