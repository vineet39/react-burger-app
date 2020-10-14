import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import test from '../../axois-orders';
import errorHandler from '../../hoc/Errorhandler/ErrorHandler';

class Orders extends Component {
    // _isMounted = false;
    state = {
        orders: [],
        loading: true
    }
    async componentDidMount() {
        await test.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({ ...res.data[key], id: key });
                }
                this.setState({ orders: fetchedOrders });
            });
    }
    render() {
        return (
            <div>
                {this.state.orders.map(o => (<Order
                    key={o.id}
                    price={+o.price}
                    ingredients={o.ingredients} />))}
            </div>
        )
    }
}

export default errorHandler(Orders, test);