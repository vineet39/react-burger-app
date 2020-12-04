import React from 'react';
import classes from './Order.css';

const icons = {
    meat: {
        icon: 'fa fa-drumstick-bite',
        color: 'red'
    },
    cheese: {
        icon: 'fa fa-cheese',
        color: 'gold'
    },
    salad: {
        icon: 'fa fa-leaf',
        color: 'green'
    },
    bacon: {
        icon: 'fa fa-bacon',
        color: 'brown'
    },
}
const order = (props) => {
    const ingredients = [];

    for(let ingredientName in props.ingredients){
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }

    const ingreOutput = ingredients.map(ig => {
        return ig.amount >0 ? <span key={ig.name} className={classes.Test}><i className={icons[ig.name].icon} style={{color:icons[ig.name].color, fontSize: '20px'}}></i><span className={classes.Colon}>x { ig.amount}</span></span> : ''
    })
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingreOutput}</p>
            <p>Price: <strong>{Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>)
};

export default order;