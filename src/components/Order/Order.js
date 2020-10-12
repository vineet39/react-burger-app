import React from 'react';
import classes from './Order.css';

const order = (props) => {
    const ingredients = [];

    for(let ingredientName in props.ingredients){
        console.log(ingredientName);
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }

    const ingreOutput = ingredients.map(ig => {
        return ig.amount >0 ? <span key={ig.name} className={classes.Test}>{ig.name}<span className={classes.Colon}>:</span>{ ig.amount}</span> : ''
    })
    return (
        <div className={classes.Order}>
            <p>{ingreOutput}</p>
            <p>Price: <strong>{Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>)
};

export default order;