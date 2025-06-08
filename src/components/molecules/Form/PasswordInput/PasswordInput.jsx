import React from 'react';
import Input from '@atoms/Form/Input/Input';
import { Eye, EyeOff } from 'lucide-react';
import styles from './PasswordInput.module.scss';

const PasswordInput = ({ 
  placeholder, 
  value, 
  onChange, 
  required,
  isVisible,
  setIsVisible,
  ...rest 
}) => {
  return (
    <div className={styles.password}>
      <Input
        type={isVisible ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        {...rest}
      />
      <button
        type="button"
        onClick={() => setIsVisible(!isVisible)}
        className={styles.visibilityButton}
      >
        {isVisible ? <EyeOff size={14} /> : <Eye size={14} />}
      </button>
    </div>
  );
};

export default PasswordInput;