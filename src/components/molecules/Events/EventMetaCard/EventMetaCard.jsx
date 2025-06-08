import React from 'react';
import TagList from '@molecules/Profile/TagList/TagList';
import Typography from '@atoms/Text/Typography/Typography';
import styles from './EventMetaCard.module.scss';

const EventMetaCard = ({ category, tags, date }) => {
  const formattedDates = (date || []).map((d) => {
    const jsDate = new Date(d.date);
    const datePart = jsDate.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      timeZone: 'UTC'
    });
    const timePart = jsDate.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC'
    });
    return { date: datePart, time: timePart };
  });

  return (
    <>
      {tags && tags.length > 0 && <TagList tags={tags} />}
      <div className={styles.card}>
        <div className={styles.header}>
          <Typography variant="h3" weight="thin">
            {category?.name || category || 'Категория'}
          </Typography>
        </div>
        <div className={styles.body}>
          {formattedDates.map((fd, idx) => (
            <div key={idx} className={styles.dateCard}>
              <Typography variant="h4" weight="bold">
                {fd.date}
              </Typography>
              <Typography variant="h4" weight="thin">
                {fd.time}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};


export default EventMetaCard;
