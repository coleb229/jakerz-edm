'use client'
import { Text } from '@mantine/core';
import styles from './PageHeader.module.css';
import Image from 'next/image';
import JakerzIcon from '@/public/jakerz-icon.png';

export const PageHeader = ({ layout }:any) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Text size="xl" className={styles.headerText}>{layout.headerText}</Text>
        <Text size="md" className={styles.subheader}>{layout.subheaderText}</Text>
      </div>
      <div>
        <Image
          src={layout.headerImage !== undefined || '' ? layout.headerImage : JakerzIcon}
          className={styles.headerImage}
          alt="Header Image"
          width={100}
          height={100}
        />
      </div>
    </div>
  );
}