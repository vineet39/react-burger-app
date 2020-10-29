import * as burgerActionTypes from './actions/burgerBuilder';
import * as orderActionTypes from './actions/order';

export const mapStateToProps = state => {
    return {
        ings: state.burgerBuilderReducer.ingredients,
        price: state.burgerBuilderReducer.totalPrice,
        error: state.burgerBuilderReducer.error,
        loaded: state.burgerBuilderReducer.loaded,
        isAuth: state.authReducer.token !== null
    }
}

export const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerActionTypes.addIngridient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerActionTypes.removeIngridient(ingName)),
        onInitIngredient: () => dispatch(burgerActionTypes.initIngridients()),
        onPurchase: (orderData) => dispatch(orderActionTypes.purchaseBurgerStart(orderData)),
    }
}