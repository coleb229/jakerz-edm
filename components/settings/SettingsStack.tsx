'use client'
import { Tabs, Stack } from '@mantine/core';
import { UploadBackgroundImage } from './UploadBackgroundImage';
import { GrHomeRounded } from "react-icons/gr";
import { GrGallery } from "react-icons/gr";
import { BiSolidVideos } from "react-icons/bi";
import { FaCalendarDays } from "react-icons/fa6";
import { GrContact } from "react-icons/gr";
import styles from './SettingsStack.module.css';

export const SettingsStack = () => {
  const iconStyle = {
    width: 24,
    height: 24,
  };

  return (
    <Tabs defaultValue="home" className={styles.container}>
      <Tabs.List className={styles.list}>
        <Tabs.Tab
          value="home"
          className={styles.tab}
          leftSection={<GrHomeRounded
          style={iconStyle} />}
        >
          Home
        </Tabs.Tab>
        <Tabs.Tab
          value="shows"
          className={styles.tab}
          leftSection={<FaCalendarDays style={iconStyle} />}
        >
          Shows
        </Tabs.Tab>
        <Tabs.Tab
          value="gallery"
          className={styles.tab}
          leftSection={<GrGallery style={iconStyle} />}
        >
          Gallery
        </Tabs.Tab>
        <Tabs.Tab
          value="videos"
          className={styles.tab}
          leftSection={<BiSolidVideos style={iconStyle} />}
        >
          Videos
        </Tabs.Tab>
        <Tabs.Tab
          value="contact"
          className={styles.tab}
          leftSection={<GrContact style={iconStyle} />}
        >
          Contact
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="home" className={styles.panel}>
        <Stack
          className={styles.stack}
          bg="var(--mantine-color-body)"
          align="stretch"
          justify="center"
          gap="md"
        >
          <UploadBackgroundImage />
        </Stack>
      </Tabs.Panel>

      <Tabs.Panel value="shows">
        Shows tab content
      </Tabs.Panel>

      <Tabs.Panel value="gallery">
        Gallery tab content
      </Tabs.Panel>

      <Tabs.Panel value="videos">
        Videos tab content
      </Tabs.Panel>

      <Tabs.Panel value="contact">
        Contact tab content
      </Tabs.Panel>
    </Tabs>
  );
}