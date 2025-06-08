import React from 'react';
import Typography from '@atoms/Text/Typography/Typography';
import styles from './NothingFoundMessage.module.scss'

const NothingFoundMessage = ({ title = 'Ничего не найдено', subtitle = 'Попробуйте изменить параметры' }) => {
  return (
    <>
      <Typography variant="h3" weight="thin" className={styles.title}>{title}</Typography>
      <Typography variant="h4" weight="thin" color="gray"  style={{ marginTop: 8 }}>
        {subtitle}
      </Typography>
    </>
  );
};

export default NothingFoundMessage;
