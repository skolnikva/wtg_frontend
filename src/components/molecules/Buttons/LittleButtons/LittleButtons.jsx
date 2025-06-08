import React from 'react';
import styles from './LittleButtons.module.scss';
import LittleButton from '@atoms/Buttons/LittleButton/LittleButton';

const LittleButtons = ({ buttons }) => {
  return (
    <div className={styles.buttonContainer}>
      {buttons.map((button, index) => (
        <LittleButton
          key={index}
          onClick={button.onClick}
          variant={button.variant}
          disabled={button.disabled}
          type={button.type}
          className={button.className}
        >
          {button.label}
        </LittleButton>
      ))}
    </div>
  );
};

export default LittleButtons;