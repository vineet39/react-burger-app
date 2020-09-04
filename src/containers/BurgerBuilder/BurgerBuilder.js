import React, { Component } from "react";
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
        purchasable: false,
        purchasing: false
    }
    checkIfPurchasable (ingredients) {
        for (var key in ingredients) {
            if (ingredients.hasOwnProperty(key)) {
                if(ingredients[key] > 0){
                    this.setState({purchasable: true});
                    return;
                }
            }
        }
        this.setState({purchasable: false});
    }
    addIngredientHandler = (type) =>  {
        const updatedCount = this.state.ingredients[type] + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.checkIfPurchasable(updatedIngredients);
    }
    removeIngredientHandler = (type) =>  {
        const existingCount = this.state.ingredients[type];
        let updatedCount = 0;
        if(existingCount > 0){
            updatedCount = existingCount - 1;
        }
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.checkIfPurchasable(updatedIngredients);
    }
    purchaseHandler = () => {
        console.log('Purchase Handler called');
        this.setState({purchasing: true})
    }
    render() {
        const disabledInfo = { ...this.state.ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing}>
                    <OrderSummary ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                />
            </Aux>
        );
    };
}

export default BurgerBuilder;
