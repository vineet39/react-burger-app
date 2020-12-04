import React from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

const modal = props => {
    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div
                className={[classes.Modal, classes[props.modalType]].join(' ')}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                <button className={classes.CloseButtonIcon} onClick={props.modalClosed}><i className="fa fa-times-circle"></i></button>
                {props.children}
            </div>
        </Aux>
    );
}

export default React.memo(modal, (prevProps, nextProps) => prevProps.show === nextProps.show
    && prevProps.modalClosed === nextProps.modalClosed);