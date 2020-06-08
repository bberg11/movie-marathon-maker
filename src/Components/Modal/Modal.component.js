import React from 'react';
import PropTypes from 'prop-types';
import { MdClose } from 'react-icons/md';

import './Modal.styles.scss';

const Modal = ({ children, closeHandler }) => {
  return (
    <div className="modal">
      <button type="button" className="modal__overlay" onClick={closeHandler}>
        Close Modal
      </button>
      <div className="modal__content">
        <div className="modal__header">
          <button type="button" className="button-reset" onClick={closeHandler}>
            <MdClose className="modal__close" />
          </button>
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  closeHandler: PropTypes.func.isRequired,
};

export default Modal;
