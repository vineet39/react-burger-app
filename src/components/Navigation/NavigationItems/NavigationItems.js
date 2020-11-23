import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/react-burger-app/burgerBuilder">Burger Builder</NavigationItem>
        {!props.isAuth ? null : <NavigationItem link="/react-burger-app/orders">Orders</NavigationItem>}
        {!props.isAuth ? <NavigationItem link="/react-burger-app/auth">Login</NavigationItem> : <NavigationItem link="/react-burger-app/logout">Logout</NavigationItem>}
    </ul>
);

export default navigationItems;