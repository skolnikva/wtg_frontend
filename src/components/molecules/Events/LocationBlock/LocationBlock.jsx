import React from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@atoms/Text/Typography/Typography';
import LocationMapCard from '@atoms/LocationMapCard/LocationMapCard';
import rightBlack from '@/assets/img/right-black.png';
import styles from './LocationBlock.module.scss';

const LocationBlock = ({ location }) => {
  const navigate = useNavigate();

  if (!location) return null;

  const handleTitleClick = () => {
    navigate(`/locations/${location.name}/${location.id}`);
  };

  return (
    <div className={styles.locationBlock}>
      <div className={styles.locationInfo}>
        <div
          className={styles.clickableTitle}
          onClick={handleTitleClick}
          role="link"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleTitleClick();
          }}
          style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}
        >
          <Typography variant="h3" weight="bold">
            {location.name}
          </Typography>
          <img src={rightBlack} alt="Перейти к локации" className={styles.rightArrow} />
        </div>

        <Typography variant="h4" color="gray">
          {location.address}
        </Typography>
      </div>
      
      <LocationMapCard 
        location={location} 
        staticHeight="120px"
      />
    </div>
  );
};

export default LocationBlock;