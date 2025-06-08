import React from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@atoms/Text/Typography/Typography';
import styles from './SearchResultList.module.scss';

const SearchResultList = ({ results }) => {
  const navigate = useNavigate();

  if (results.length === 0) return (
    <Typography variant="h3" weight="thin" className={styles.empty}>
      Ничего не найдено
    </Typography>
  );

  const handleClick = (item) => {
    const basePath = item.type === 'event' ? 'event' : 
                    item.type === 'location' ? 'locations' : '';
    if (!basePath) {
      console.warn('Неизвестный тип для навигации:', item.type);
      return;
    }
    navigate(`/${basePath}/${item.name}/${item.id}`);
  };

  return (
    <ul className={styles.list}>
      {results.map((item) => (
        <li
          key={item.id}
          className={styles.item}
          onClick={() => handleClick(item)}
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleClick(item)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default SearchResultList;
