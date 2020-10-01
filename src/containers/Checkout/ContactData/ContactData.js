import React, { Component } from "react";
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        ingredients: {
            name: '',
            email: '',
            address: {
                street: '',
                postalCode: ''
            }
        }
    }
    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients)
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
