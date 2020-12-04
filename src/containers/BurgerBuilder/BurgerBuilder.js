import React, { useState, useEffect } from "react";
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

const burgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);
    useEffect(() => {
        props.onInitIngredient();
    }, []);
    const checkIfPurchasable = () => {
        const ingredients = props.ings;
        for (var key in ingredients) {
            if (ingredients.hasOwnProperty(key)) {
                if (ingredients[key] > 0) {
                    return true;
                }
            }
        }
        return false;
    }
    const purchaseHandler = () => {
        setPurchasing(true);
    }
    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }
    const purchaseContinueHandler = () => {
        if (props.isAuth)
            props.history.push('/react-burger-app/checkout')
        else
            props.history.push('/react-burger-app')
    }
    const disabledInfo = { ...props.ings };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = <Spinner />;

    if (props.error) {
        burger = <Modal show={props.error}>Try refreshing the page</Modal>
    }

    if (props.ings && !props.error && props.loaded) {
        burger = (
            <Aux>
                <Burger ingredients={props.ings} />
                <BuildControls
                    ingredientAdded={props.onIngredientAdded}
                    ingredientRemoved={props.onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasable={checkIfPurchasable()}
                    ordered={purchaseHandler}
                    price={props.price} />
            </Aux>
        );
        orderSummary = <OrderSummary
            ingredients={props.ings}
            price={props.price}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler} />;
    }
    return (
        <Aux>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(burgerBuilder, instance));
