import React from 'react';
import styles from './Textarea.module.scss';

const Textarea = ({ name, value, onChange, className, ...rest }) => {
  const textareaClass = `${styles.textarea} ${className || ''}`;
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className={textareaClass}
      {...rest}
    />
  );
};

export default Textarea;