import React from 'react';
import styles from './SearchTemplate.module.scss';
import Typography from '@atoms/Text/Typography/Typography';
import FullPageModalOverlay from '@templates/FullPageModalOverlay/FullPageModalOverlay';
import SearchForm from '@molecules/SearchForm/SearchForm';
import SearchResultList from '@organisms/SearchResultList/SearchResultList';

const SearchTemplate = ({
  query,
  onChange,
  onSearch,
  onReset,
  onClose,
  results,
  loading
}) => (
  <FullPageModalOverlay onClose={onClose}>
    <div className={styles.wrapper}>
      <Typography variant="h1" className={styles.title}>
        Искать мероприятия
      </Typography>

      <div className={styles.searchForm}>
        <SearchForm
          query={query}
          onChange={onChange}
          onSearch={onSearch}
          onReset={onReset}
        />
      </div>

      {loading && <p>Загрузка...</p>}

      <div className={styles.results}>
        <SearchResultList results={results} />
      </div>
    </div>
  </FullPageModalOverlay>
);

export default SearchTemplate;
