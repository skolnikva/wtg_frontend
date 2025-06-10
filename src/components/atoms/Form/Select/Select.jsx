import React from 'react';
import Select from 'react-select';
import Label from '@atoms/Form/Label/Label';
import styles from './Select.module.scss';
import Typography from '@atoms/Text/Typography/Typography';

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    boxSizing: 'border-box',
    backgroundColor: 'var(--secondary-color)',
    borderColor: state.isFocused ? 'var(--primary-color)' : 'var(--light-gray-color)',
    borderWidth: '1px',
    borderRadius: 100,
    fontFamily: '"Montserrat", sans-serif',
    fontWeight: 400,
    fontSize: '12px',
    width: '100%',
    minHeight: '36px',
    boxShadow: 'none',
    cursor: 'pointer',
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    padding: 0,
    paddingLeft: '10px',
    boxSizing: 'border-box',
    transition: 'padding 0.2s ease-in-out',
  }),
  input: () => ({
    padding: 'none',
    display: 'none',
  }),
  dropdownIndicator: () => ({
    display: 'none',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 999,
    borderRadius: '12px',
    marginTop: '4px',
    backgroundColor: 'var(--secondary-color)',
    padding: 0,
  }),
  menuList: (provided) => ({
    ...provided,
    paddingTop: 0,
    paddingBottom: 0,
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: '12px',
    fontFamily: '"Montserrat", sans-serif',
    color: 'var(--primary-color)',
    backgroundColor: state.isSelected
      ? 'var(--secondary-color)'
      : state.isFocused
        ? 'var(--hover-gray-color)'
        : 'var(--secondary-color)',
    cursor: 'pointer',
    padding: '10px 12px',
    borderRadius: '12px',
    boxShadow: 'none',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'var(--primary-color)',
    margin: '0',
  }),
};

const SelectField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  options, 
  error,
  ...rest 
}) => {
  const handleChange = (selectedOption) => {
    onChange({
      target: {
        name,
        value: selectedOption.value,
      },
    });
  };

  const selectedOption = options.find(opt => opt.value === value) || null;

  return (
    <div className={styles['formGroup']}>
      {label && <Label>{label}</Label>}
      <Select
        options={options}
        value={selectedOption}
        onChange={handleChange}
        styles={customStyles}
        isSearchable={false}
        classNamePrefix="custom-select"
        {...rest}
      />
      {error && <Typography variant="error">{error}</Typography>}
    </div>
  );
};

export default SelectField;