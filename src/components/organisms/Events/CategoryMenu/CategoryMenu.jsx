import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './CategoryMenu.module.scss';
import MenuButton from '@atoms/Buttons/MenuButton/MenuButton';
import Image from '@atoms/Profile/Image/Image';
import Tooltip from '@atoms/Tooltip/Tooltip';
import Sort from '@/assets/img/sort.png';
import rightBlack from '@/assets/img/right-black.png';

const SCROLL_AMOUNT = 150;

const CategoryMenu = ({ items }) => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const currentRef = scrollRef.current;
    currentRef?.addEventListener('scroll', checkScrollPosition);
    
    checkScrollPosition();
    
    return () => {
      currentRef?.removeEventListener('scroll', checkScrollPosition);
    };
  }, [items]);

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