import React from 'react';
import Typography from '@atoms/Text/Typography/Typography'
import styles from './TagList.module.scss';

const TagList = ({ tags }) => (
  <Typography variant="h4" weight="thin" className={styles.container}>
    {tags && tags.length > 0 ? (
      tags.map((tag, index) => (
        <span key={index} className={styles.tag}>
          {tag.name}
        </span>
      ))
    ) : (
      <span>Нет тегов</span>
    )}
  </Typography>
);

export default TagList;