import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import * as authActionTypes from '../../store/actions/auth';
import * as burgerActionTypes from '../../store/actions/burgerBuilder';

const logout = (props) => {
    useEffect(() => {
        props.logout();
    })
    return (
        <Redirect to="/react-burger-app/" />
    );

}
const mapDispatchToProps = dispatch => {
    return {
        logout: () => {
            dispatch(authActionTypes.logout());
            dispatch(burgerActionTypes.initIngridients());
        }
    }
}
export default connect(null, mapDispatchToProps)(logout);