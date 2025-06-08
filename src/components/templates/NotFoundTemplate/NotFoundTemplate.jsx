import React from 'react';
import SubmitButton from '@atoms/Buttons/SubmitButton/SubmitButton';
import serverError from '@/assets/img/server-error.png';
import styles from './NotFoundTemplate.module.scss';

const NotFoundTemplate = ({ errorCode = 404, onGoBack, isServerError = false }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.textBlock}>
          <h1 className={styles.title}>ОЙ!</h1>
          <p className={styles.description}>
            {isServerError
              ? 'Сервер недоступен. Попробуйте позже.'
              : 'Похоже, мы не можем найти нужную вам страницу'}
          </p>
          {!isServerError && (
            <p className={styles.errorCode}>Код ошибки: {errorCode}</p>
          )}
          {!isServerError && (
            <div className={styles.buttonWrapper}>
              <SubmitButton onClick={onGoBack}>
                Назад
              </SubmitButton>
            </div>
          )}
        </div>
        <div className={styles.imageBlock}>
          <img
            src={serverError}
            alt="Ошибка"
            className={styles.errorImage}
          />
        </div>
      </div>
    </div>
  );
};

export default NotFoundTemplate;
