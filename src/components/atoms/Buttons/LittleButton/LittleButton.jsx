import React from 'react';
import styles from './LittleButton.module.scss';

const LittleButton = ({ children, onClick, variant, ...props }) => {
  let buttonStyle = styles.button;

  switch (variant) {
    case 'grey':
      buttonStyle = `${buttonStyle} ${styles.grey}`;
      break;
    case 'black':
      buttonStyle = `${buttonStyle} ${styles.black}`;
      break;
    case 'danger':
      buttonStyle = `${buttonStyle} ${styles.danger}`;
      break;
    default:
      break;
  }

  return (
    <button {...props} onClick={onClick} className={buttonStyle}>
      {children}
    </button>
  );
};

export default LittleButton;