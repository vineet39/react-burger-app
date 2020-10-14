import React, { Component } from "react";
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import instance from '../../../axois-orders';
import Input from '../../../components/UI/Input/Input';
import SimpleReactValidator from 'simple-react-validator';
import Aux from '../../../hoc/Aux';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../../store/storeProps';

class ContactData extends Component {
    constructor() {
        super();
        this.validator = new SimpleReactValidator();
    }
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeHolder: 'Your name'
                },
                value: '',
                validation: 'required'
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeHolder: 'Your street'
                },
                value: '',
                validation: 'required'
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeHolder: 'Your zipcode'
                },
                value: '',
                validation: 'required'
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeHolder: 'Your country'
                },
                value: '',
                validation: 'required'
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeHolder: 'Your E-mail'
                },
                value: '',
                validation: 'required|email'
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{ value: 'fastest', displayValue: 'Fastest' }, { value: 'cheapest', displayValue: 'Cheapest' }]
                },
                value: '',
                validation: ''
            },
        }
    }
    orderHandler = (event) => {
        event.preventDefault();
        if (this.validator.allValid()) {
            const formData = {};
            for (let data in this.state.orderForm) {
                formData[data] = this.state.orderForm[data].value;
            }
            const order = {
                ingredients: this.props.ings,
                price: this.props.price,
                orderData: formData
            }
            instance.post('/orders.json', order)
                .then(response => {
                    this.props.history.push('/');
                });
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }
    inputChangehandler = (event, id) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[id]
        }
        updatedFormElement.value = event.target.value;
        updatedOrderForm[id] = updatedFormElement;
        this.setState({ orderForm: updatedOrderForm });

    }
    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact details</h4>
                <form>
                    {formElementsArray.map(f => (
                        <Aux>
                            <Input
                                elementType={f.config.elementType}
                                elementConfig={f.config.elementConfig}
                                value={f.config.value}
                                changed={e => this.inputChangehandler(e, f.id)}
                                className="form-control" />
                            {f.config.elementType !== "select" &&
                                <small className={classes.Error}>{this.validator.message(f.id, f.config.value, f.config.validation, { className: 'text-danger' })}</small>
                            }
                        </Aux>

                    ))}
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>
            </div>
        );
    };
}

export default connect(mapStateToProps)(ContactData);
