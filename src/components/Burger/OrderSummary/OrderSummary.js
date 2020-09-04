import React from 'react';

const orderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map(key => {
            return (
                <li key={key}>
                    <span style={{ textTransform: 'capitalize' }}>{key}</span>: {props.ingredients[key]}
                </li>);
        });
    return (
        <div>
            <h3>Your Order Summary</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
        </div>
    );

};

export default orderSummary;
