import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@organisms/Header/Header';
import Footer from '@organisms/Footer/Footer';
import CategoryMenu from '@organisms/Events/CategoryMenu/CategoryMenu';
import useFilteredCategories from '@hooks/useFilteredCategories';
import styles from './MainTemplate.module.scss';

const allowedPaths = [
  '/', 
  /^\/event\/[^/]+\/[^/]+$/, 
  /^\/category\/[^/]+\/[^/]+$/, 
  /^\/locations\/[^/]+\/[^/]+$/
];

const MainTemplate = ({ children, onOpenAuthModal }) => {
  const { filteredCategories } = useFilteredCategories();
  const location = useLocation();
  const path = location.pathname;

  const showCategoryMenu = allowedPaths.some((pattern) =>
    typeof pattern === 'string' ? pattern === path : pattern.test(path)
  );

  return (
    <div className={styles.container}>
      <Header onOpenAuthModal={onOpenAuthModal} />

      {showCategoryMenu && <CategoryMenu items={filteredCategories}/>}

      <div className="page-wrapper">
        <main className={styles.main}>
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default MainTemplate;
