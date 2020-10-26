import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import icons from '../Order/Order';


const burger = (props) => {
    let items = [];
    const ingredients = { ...props.ingredients, 'test':'test'};
    for (var name in ingredients) {
        if (ingredients.hasOwnProperty(name)) {
            let value = ingredients[name];
            if (value > 0) {
                for (let i = 0; i <= value - 1; i++) {
                    items.push(<BurgerIngredient key={name + i} type={name} />);
                }
            }
        }
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"></BurgerIngredient>
            {items.length === 0 ? <p>Please add some items</p> : items}
            <BurgerIngredient type="bread-bottom"></BurgerIngredient>
        </div>
    );
};

export default burger;