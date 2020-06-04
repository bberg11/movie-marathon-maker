import React, { useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { MdClose } from 'react-icons/md';

import './Drawer.styles.scss';

const Drawer = ({ closeHandler, visible, children }) => {
  useEffect(() => {
    const htmlEl = document.querySelector('html');

    if (visible) {
      htmlEl.classList.add('no-scroll');
    } else {
      htmlEl.classList.remove('no-scroll');
    }
  }, [visible]);

  return (
    <div
      className={classNames({
        drawer: 'true',
        'drawer--is-visible': visible,
      })}
    >
      <button type="button" className="drawer__overlay" onClick={closeHandler}>
        Close Drawer
      </button>
      <div className="drawer__content">
        <div className="drawer__header">
          <button type="button" className="button-reset" onClick={closeHandler}>
            <MdClose style={{ width: '20px', height: '20px' }} />
          </button>
        </div>
        <div className="drawer__body">{children}</div>
      </div>
    </div>
  );
};

Drawer.defaultProps = {
  visible: false,
};

Drawer.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  visible: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Drawer;
