import React from 'react';
import classes from './Input.css';

const input = (props) => {
    let inputElement = null;

    switch (props.elementType) {
        case ('input'):
            inputElement = <input {...props.elementConfig} className={[classes.Input, 'form-control'].join(' ')} value={props.value} onChange={props.changed}/>
            break;
        case ('textarea'):
            inputElement = <textarea {...props.elementConfig} className={classes.Input} value={props.value} onChange={props.changed}/>
            break;
        case ('select'):
            inputElement = (<select
                className={classes.Select} value={props.value} onChange={props.changed}>
                {props.elementConfig.options.map(o => (
                    <option value={o.value}>{o.displayValue}</option>
                ))}
            </select>)
            break;
        default:
            inputElement = <input {...props.elementConfig} className={classes.Input} value={props.value} onChange={props.changed} />
    }
    return (
        <div>
            <label>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input;