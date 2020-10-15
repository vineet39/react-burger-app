import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let ingredients = Object.keys(props.ingredients).map(name => {
        return [...Array(props.ingredients[name])].map((_, i) => {
            return <BurgerIngredient key={name + i} type={name} />
        });
    }).reduce((total, amount) => {
        return total.concat(amount);
    });
    if(ingredients.length ===0) {
        ingredients = <p>Please add some items</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"></BurgerIngredient>
            {ingredients}
            <BurgerIngredient type="bread-bottom"></BurgerIngredient>
        </div>
    );
};

export default burger;