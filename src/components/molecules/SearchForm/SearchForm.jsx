import React from 'react';
import styles from './SearchForm.module.scss';
import searchIcon from '@/assets/img/search-gray.png';
import closeIcon from '@/assets/img/close-gray.png';

const SearchForm = ({ query, onChange, onSearch, onReset }) => (
  <div className={styles.form}>
    <div className={styles.inputWrapper}>
      <img src={searchIcon} alt="Поиск" className={styles.searchIcon} />
      <input
        type="text"
        value={query}
        onChange={onChange}
        placeholder="События и места..."
      />
      {query && (
        <button className={styles.resetButton} onClick={onReset} type="button">
          <img src={closeIcon} alt="Сбросить" />
        </button>
      )}
    </div>
  </div>
);

export default SearchForm;
