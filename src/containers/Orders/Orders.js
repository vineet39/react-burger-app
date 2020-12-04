import React, { useEffect, useState } from 'react';
import Order from '../../components/Order/Order';
import test from '../../axois-orders';
import errorHandler from '../../hoc/Errorhandler/ErrorHandler';
import Aux from '../../hoc/Aux';
import Modal from '../../components/UI/Modal/Modal';

const orders = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [orders, setOrders] = useState([]);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await test.get('/orders.json')
                .then(res => {
                    const fetchedOrders = [];
                    for (let key in res.data) {
                        fetchedOrders.push({ ...res.data[key], id: key });
                    }
                    setOrders(fetchedOrders);
                }).catch(error => {
                    setIsError(true);
                    setErrorMessage(error.message);
                })
        }
        fetchData();
    }, [])
    const dismissErrorHandler = () => {
        setIsError(false);
        this.props.history.push('/');
    }
    return (
        <Aux>
            <Modal show={isError} modalClosed={dismissErrorHandler}>
                <p>{errorMessage.toString()}</p>
            </Modal>
            <div>
                {orders.map(o => (<Order
                    key={o.id}
                    price={+o.price}
                    ingredients={o.ingredients}
                />))}
            </div>
        </Aux>

    )

}

export default orders;