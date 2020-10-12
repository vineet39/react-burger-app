import React, { Component } from 'react';
import Aux from '../Aux';
import Modal from '../../components/UI/Modal/Modal';

const errorHandler = (WrappedComponent, instance) => {
    return class extends Component {
        state = {
            error: null
        }
        // componentDidMount() {
        //     instance.interceptors.response.use(req => {
        //         this.setState({error: null})
        //     })
        //     instance.interceptors.response.use(null, error => {
        //         console.log('Called in error handler');
        //         this.setState({error: error});
        //     })
        // }
        nullError = () => {
            this.setState({ error: null })
        }
        render() {
            return (
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.nullError}>{this.state.error ? this.state.error.message : null}</Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}

export default errorHandler;