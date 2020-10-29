import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/burgerBuilder" >Burger Builder</NavigationItem>
        {!props.isAuth ? null : <NavigationItem link="/orders">Orders</NavigationItem>}
        {!props.isAuth ? <NavigationItem link="/auth">Login</NavigationItem> : <NavigationItem link="/logout">Logout</NavigationItem>}
    </ul>
);

export default navigationItems;