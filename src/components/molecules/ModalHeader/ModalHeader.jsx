import React from 'react';
import AuthTitle from '@atoms/Modals/ModalTitle/ModalTitle';
import HiSticker from '@atoms/Modals/Sticker/Sticker';
import styles from './ModalHeader.module.scss';

const ModalHeader = ({ title, stickerSrc, stickerAlt }) => (
  <div className={styles.container}>
    <AuthTitle title={title} />
    <HiSticker src={stickerSrc} alt={stickerAlt} />
  </div>
);

export default ModalHeader;