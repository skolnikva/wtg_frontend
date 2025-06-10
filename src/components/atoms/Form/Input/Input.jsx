import React from 'react';
import styles from './Input.module.scss';

const Input = ({
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  required,
  className,
  error,
  ...rest
}) => {
  const inputClass = `${styles.input} ${error ? styles['inputError'] : ''} ${className || ''}`;

  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={inputClass}
      {...rest}
    />
  );
};

export default Input;