import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import test from '../../axois-orders';
import errorHandler from '../../hoc/Errorhandler/ErrorHandler';
import Aux from '../../hoc/Aux';
import Modal from '../../components/UI/Modal/Modal';

class Orders extends Component {
    state = {
        orders: [],
        error: false,
        errorMessage: ''
    }
    async componentDidMount() {
        await test.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({ ...res.data[key], id: key });
                }
                this.setState({ orders: fetchedOrders });
            }).catch(error => {
                this.setState({ error: true, errorMessage: error.message });
            })
    }
    dismissErrorHandler = () => {
        this.setState({ error: false });
        this.props.history.push('/');
    }
    render() {
        return (
            <Aux>
                <Modal show={this.state.error} modalClosed={this.dismissErrorHandler}>
                    <p>{this.state.errorMessage.toString()}</p>
                </Modal>
                <div>
                    {this.state.orders.map(o => (<Order
                        key={o.id}
                        price={+o.price}
                        ingredients={o.ingredients}
                    />))}
                </div>
            </Aux>

        )
    }
}

export default Orders;