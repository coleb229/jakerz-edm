import { Text } from '@mantine/core';
import styles from './PageHeader.module.css';

export const PageHeader = ({ layout }:any) => {
  return (
    <div className={styles.container}>
      <div>
        <Text size="xl" className={styles.headerText}>{layout.headerText}</Text>
        <Text size="md" className={styles.subheader}>{layout.subheaderText}</Text>
      </div>
    </div>
  );
}