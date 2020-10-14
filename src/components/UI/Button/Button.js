import React from 'react';
import classes from './Button.css';

const button = (props) => {
    console.log(props.isDisabled);
    return (
        <button
            className={[classes.Button, classes[props.btnType]].join(' ')}
            onClick={props.clicked}
            disabled={props.isDisabled}>{props.children}
        </button>
    );
};

export default button;