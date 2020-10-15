import * as actionTypes from './actions/burgerBuilder';

export const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actionTypes.addIngridient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actionTypes.removeIngridient(ingName)),
        onInitIngredient: () => dispatch(actionTypes.initIngridients())
    }
}