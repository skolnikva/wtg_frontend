import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './CategoryMenu.module.scss';
import MenuButton from '@atoms/Buttons/MenuButton/MenuButton';
import Image from '@atoms/Profile/Image/Image';
import Tooltip from '@atoms/Tooltip/Tooltip';
import useHorizontalScroll from '@hooks/useHorizontalScroll';
import Sort from '@/assets/img/sort.png';
import rightBlack from '@/assets/img/right-black.png';

const CategoryMenu = ({ items }) => {
  const {
    scrollRef,
    showLeftArrow,
    showRightArrow,
    scrollLeft,
    scrollRight
  } = useHorizontalScroll();
  
  const navigate = useNavigate();
  const location = useLocation();

  const handleCategoryClick = (item) => {
    navigate(`/category/${item.plural_name}/${item.id}`);
  };

  const handleSortClick = () => {
    navigate('/sort', { state: { background: location } });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.sortIcon}>
        <Tooltip text="Сортировка">
          <Image src={Sort} alt="Сортировка" onClick={handleSortClick}/>
        </Tooltip>
      </div>

      <div className={styles.scrollOuter}>
        <div className={styles.scrollWrapper}>
          {showLeftArrow && (
            <div className={styles.arrowLeft} onClick={scrollLeft}>
              <img src={rightBlack} alt="left" className={styles.arrowImg} />
            </div>
          )}

          <div className={styles.scrollContainer} ref={scrollRef}>
            {(items || []).map((item) => (
              <MenuButton key={item.id} onClick={() => handleCategoryClick(item)} className={styles.item}>
                {item.plural_name}
              </MenuButton>
            ))}
          </div>

          {showRightArrow && (
            <div className={styles.arrowRight} onClick={scrollRight}>
              <img src={rightBlack} alt="right" className={styles.arrowImg} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryMenu;