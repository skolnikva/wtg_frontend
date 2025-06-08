import React from 'react';
import Label from '@atoms/Form/Label/Label';
import styles from './FormField.module.scss';
import Typography from '@atoms/Text/Typography/Typography';

const FormField = ({ label, children, error, className, ...rest }) => {
  const childWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { className: `${child.props.className || ''} ${className || ''}`, ...rest });
    }
    return child;
  });

  return (
    <div className={styles['form-group']}>
      {label && <Label>{label}</Label>}
      {childWithProps}
      {error && <Typography variant="error">{error}</Typography>}
    </div>
  );
};

export default FormField;