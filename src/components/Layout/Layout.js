import React, { useState } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/ToolBar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const layout = props => {
    const[sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

    const sideDrawerClosedHandler = () => {
        setSideDrawerIsVisible(false);
    }

    const sideDrawerToggleHandler = () => {
        setSideDrawerIsVisible(!sideDrawerIsVisible);
    }

    return (
        <Aux>
            <Toolbar drawerToggleClicked={sideDrawerToggleHandler} isAuth={props.isAuth} />
            <SideDrawer
                open={sideDrawerIsVisible}
                closed={sideDrawerClosedHandler}
                isAuth={props.isAuth} />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    )

}
const mapStateToProps = state => {
    return {
        isAuth: state.authReducer.token !== null
    }
}
export default connect(mapStateToProps)(layout);