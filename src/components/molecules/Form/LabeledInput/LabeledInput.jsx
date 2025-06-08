import React, { useState } from 'react';
import Input from '@atoms/Form/Input/Input';
import Label from '@atoms/Form/Label/Label';
import styles from './LabeledInput.module.scss';
import Typography from '@atoms/Text/Typography/Typography';
import infoIcon from '@/assets/img/info.png';

const LabeledInput = ({ 
  label, 
  name, 
  value, 
  onChange, 
  type = 'text',
  placeholder, 
  error, 
  required,
  hint,
  children,
  ...rest 
}) => {
  const [showHint, setShowHint] = useState(false);

  return (
    <div className={styles['form-group']}>
      <div className={styles.labelContainer}>
        <Label htmlFor={name}>{label}{required && '*'}</Label>
        {hint && (
          <div className={styles.hintContainer}>
            <button 
              type="button" 
              className={styles.hintButton}
              onMouseEnter={() => setShowHint(true)}
              onMouseLeave={() => setShowHint(false)}
              onClick={() => setShowHint(!showHint)}
            >
              <img src={infoIcon} alt="Подсказка" className={styles.infoIcon} />
            </button>
            {showHint && <div className={styles.hint}>{hint}</div>}
          </div>
        )}
      </div>
      {children || (
        <Input
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          className={error ? styles['input-error'] : ''}
          required={required}
          title={''}
          {...rest}
        />
      )}
      {error && <Typography variant="error" className={styles.error}>{error}</Typography>}
    </div>
  );
};

export default LabeledInput;