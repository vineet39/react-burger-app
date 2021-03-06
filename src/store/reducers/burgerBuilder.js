import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4,
    error: false,
    loaded: false,
    building: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredentName]: state.ingredients[action.ingredentName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredentName],
                building: true
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredentName]: state.ingredients[action.ingredentName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredentName],
                building: true
            };
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                totalPrice: 4,
                loaded: true,
                building: false
            };
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            };
        default:
            return state;
    }
};

export default reducer;