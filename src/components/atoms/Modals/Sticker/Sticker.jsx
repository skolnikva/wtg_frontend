import React from 'react';
import styles from './Sticker.module.scss';

const Sticker = ({ src, alt }) => <img className={styles.imgSticker} src={src} alt={alt} />;

export default Sticker;