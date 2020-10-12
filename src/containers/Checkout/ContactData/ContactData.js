import React, { Component } from "react";
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import instance from '../../../axois-orders';

class ContactData extends Component {
    state = {
        ingredients: {
            name: '',
            email: '',
            address: {
                street: '',
                postalCode: ''
            },
            price: 0
        }
    }
    orderHandler = (event) => {
        event.preventDefault();
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Vineet',
                address: 'Reservoir',
                email: 'abc@gmail.com'
            }
        }
        instance.post('/orders.json', order)
            .then(response => {
                this.props.history.push('/');
            });
    }
    render() {
        return(
            <div className={classes.ContactData}>
               <h4>Enter your contact details</h4> 
               <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your name" />
                    <input className={classes.Input} type="email" name="email" placeholder="Your email" />
                    <input className={classes.Input} type="text" name="street" placeholder="Your street" />
                    <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
               </form>
            </div>
        );
    };
}

export default ContactData;
