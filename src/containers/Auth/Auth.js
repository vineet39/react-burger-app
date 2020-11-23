import React, { Component } from "react";
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import Input from '../../components/UI/Input/Input';
import SimpleReactValidator from 'simple-react-validator';
import Aux from '../../hoc/Aux';
import { connect } from 'react-redux';
import * as authActionTypes from '../../store/actions/auth';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from "react-router-dom";

const errorMessages = (value) => {
    switch (value) {
        case 'EMAIL_NOT_FOUND':
            return 'There is no user record corresponding to this identifier. The user may have been deleted.';
        case 'INVALID_PASSWORD':
            return 'Password entered is incorrect.';
        case 'EMAIL_EXISTS':
            return 'The email address is already in use by another account.';
        case 'USER_DISABLED':
            return 'The user account has been disabled by an administrator.';
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
            return 'We have blocked all requests from this device due to unusual activity. Try again later.';
        default:
            return 'Error signing in. Try again later';
    }
};

class Auth extends Component {
    constructor() {
        super();
        this.validator = new SimpleReactValidator();
    }
    state = {
        isSignUp: false,
        authForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeHolder: 'Your E-mail'
                },
                value: '',
                validation: 'required|email'
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeHolder: 'Your password'
                },
                value: '',
                validation: 'required'
            },

        }
    }
    switchAuthModehandler = (event) => {
        event.preventDefault();
        this.setState(prevState => {
            return { isSignUp: !prevState.isSignUp }
        })
    }
    loginHandler = (event) => {
        event.preventDefault();
        if (this.validator.allValid()) {
            this.props.onAuth(this.state.authForm.email.value, this.state.authForm.password.value, this.state.isSignUp);
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }
    inputChangehandler = (event, id) => {
        const updatedauthForm = {
            ...this.state.authForm
        }
        const updatedFormElement = {
            ...updatedauthForm[id]
        }
        updatedFormElement.value = event.target.value;
        updatedauthForm[id] = updatedFormElement;
        this.setState({ authForm: updatedauthForm });

    }
    render() {
        const formElementsArray = [];
        for (let key in this.state.authForm) {
            formElementsArray.push({
                id: key,
                config: this.state.authForm[key]
            })
        }
        let data = (<div className={classes.Login}>
            <form>
                {formElementsArray.map(f => (
                    <Aux>
                        <Input
                            elementType={f.config.elementType}
                            elementConfig={f.config.elementConfig}
                            value={f.config.value}
                            key={f.config.placeHolder}
                            changed={e => this.inputChangehandler(e, f.id)}
                            className="form-control" />
                        <small className={classes.Error}>{this.validator.message(f.id, f.config.value, f.config.validation, { className: 'text-danger' })}</small>
                    </Aux>

                ))}
                {this.props.error != null ? <small className={classes.Error}>{errorMessages(this.props.error)}</small> : ''}
                <Button btnType="Success" clicked={this.loginHandler}>{!this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}</Button>
                <Button btnType="Danger" clicked={this.switchAuthModehandler}>SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGN UP'}</Button>
            </form>
        </div>);

        if (this.props.loading) {
            data = <Spinner />
        }
        if (this.props.token !== null) {
            if(!this.props.building)
                return <Redirect to="/react-burger-app/burgerBuilder" />
            else
                return <Redirect to="/react-burger-app/checkout" />
        }
        return (
            <Aux>{ data }</Aux>
            
        );
    };
}

const mapStateToProps = state => {
    return {
        loading: state.authReducer.loading,
        error: state.authReducer.error,
        token: state.authReducer.token,
        building: state.burgerBuilderReducer.building
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => {
            dispatch(authActionTypes.auth(email, password, isSignUp));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);