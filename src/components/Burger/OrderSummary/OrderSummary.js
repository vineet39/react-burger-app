import React from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map(key => {
            return (
                props.ingredients[key] > 0 ?
                    <li key={key}>
                        <span style={{ textTransform: 'capitalize' }}>{key}</span>: {props.ingredients[key]}
                    </li> : null
            );
        });
    return (
        <div>
            <h3>Your Order Summary</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </div>
    );

};

export default orderSummary;
