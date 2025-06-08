import React from 'react';
import Label from '@atoms/Form/Label/Label';
import Select from '@atoms/Form/Select/Select';
import styles from './SelectField.module.scss';

const SelectField = ({ label, name, value, onChange, options, ...rest }) => (
  <div className={styles['form-group']}>
    <Label htmlFor={name}>{label}</Label>
    <Select name={name} value={value} onChange={onChange} {...rest}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  </div>
);

export default SelectField;