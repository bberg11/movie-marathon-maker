import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { MdClose } from 'react-icons/md';

import './Modal.styles.scss';

const Modal = ({ closeHandler, visible, children }) => {
  useEffect(() => {
    const htmlEl = document.querySelector('html');

    if (visible) {
      htmlEl.classList.add('no-scroll');
    } else {
      htmlEl.classList.remove('no-scroll');
    }
  }, [visible]);

  if (!visible) {
    return '';
  }

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

Modal.defaultProps = {
  visible: false,
};

Modal.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  visible: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Modal;
