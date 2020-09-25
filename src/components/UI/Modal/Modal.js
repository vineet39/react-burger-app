import React, { Component } from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

// const modal = (props) => (
//     <Aux>
//         <Backdrop show={props.show} clicked={props.modalClosed} />
//         <div
//             className={classes.Modal}
//             style={{
//                 transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
//                 opacity: props.show ? '1' : '0'
//             }}>
//             <button className={classes.CloseButtonIcon} onClick={props.modalClosed}><i class="fa fa-times-circle"></i></button>
//             {props.children}
//         </div>
//     </Aux>
// );

class Modal extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.show !== this.props.show
    }
    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    <button className={classes.CloseButtonIcon} onClick={this.props.modalClosed}><i className="fa fa-times-circle"></i></button>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;