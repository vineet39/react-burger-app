import * as actionTypes from '../actions/actionTypes';
import instance from '../../axois-orders';

export const addIngridient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredentName: name
    }
}

export const removeIngridient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredentName: name
    }
}

export const setIngridients = (ingridients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingridients
    }
}

export const initIngridients = () => {
    return dispatch => {
        instance.get('/ingredients.json')
            .then(res => {
                dispatch(setIngridients(res.data))
                console.log(res);
            });
    }
}