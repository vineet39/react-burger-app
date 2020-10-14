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

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasing: false
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
        this.props.history.push('/checkout')
    }
    render() {
        const disabledInfo = { ...this.props.ings };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary
                        ingredients={this.props.ings}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler} />
                </Modal>
                <Burger ingredients={this.props.ings}></Burger>
                <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    price={this.props.price}
                    purchasable={this.checkIfPurchasable()}
                    ordered={this.purchaseHandler}
                />
            </Aux>
        );
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(BurgerBuilder, instance));
