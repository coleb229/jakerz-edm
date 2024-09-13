'use client'
import { Tabs, Stack } from '@mantine/core';
import { UploadBackgroundImage } from './UploadBackgroundImage';
import { AddNewVideo } from './AddNewVideo';
import { GrHomeRounded } from "react-icons/gr";
import { GrGallery } from "react-icons/gr";
import { BiSolidVideos } from "react-icons/bi";
import { FaCalendarDays } from "react-icons/fa6";
import { GrContact } from "react-icons/gr";
import styles from './SettingsStack.module.css';
import { useState } from 'react';
import clsx from 'clsx';
import { AddNewShowDate } from './AddNewShowDate';
import { AddNewPicturesToGallery } from './gallery/AddNewPicturesToGallery';
import { ChangeHeader } from './ChangeHeader';
import { UpdateBioSection } from './home/UpdateBio';

export const SettingsStack = () => {
  const [activeTab, setActiveTab] = useState<string | null>('home');
  
  const iconStyle = {
    width: 24,
    height: 24,
  };

  return (
    <Tabs value={activeTab} onChange={setActiveTab} className={styles.container}>
      <Tabs.List className={styles.list}>
        <Tabs.Tab
          value="home"
          className={clsx(styles.tab, activeTab === 'home' && styles.active)}
          leftSection={<GrHomeRounded
          style={iconStyle} />}
        >
          Home
        </Tabs.Tab>
        <Tabs.Tab
          value="shows"
          className={clsx(styles.tab, activeTab === 'shows' && styles.active)}
          leftSection={<FaCalendarDays style={iconStyle} />}
        >
          Shows
        </Tabs.Tab>
        <Tabs.Tab
          value="gallery"
          className={clsx(styles.tab, activeTab === 'gallery' && styles.active)}
          leftSection={<GrGallery style={iconStyle} />}
        >
          Gallery
        </Tabs.Tab>
        <Tabs.Tab
          value="videos"
          className={clsx(styles.tab, activeTab === 'videos' && styles.active)}
          leftSection={<BiSolidVideos style={iconStyle} />}
        >
          Videos
        </Tabs.Tab>
        <Tabs.Tab
          value="contact"
          className={clsx(styles.tab, activeTab === 'contact' && styles.active)}
          leftSection={<GrContact style={iconStyle} />}
        >
          Contact
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="home" className={styles.panel}>
        <Stack
          className={styles.stack}
          align="stretch"
          justify="center"
          gap="md"
          px={40}
        >
          <UploadBackgroundImage location='home' />
          <ChangeHeader page='home' />
          <UpdateBioSection />
        </Stack>
      </Tabs.Panel>

      <Tabs.Panel value="shows">
      <Stack
          className={styles.stack}
          align="stretch"
          justify="center"
          gap="md"
          px={40}
        >
          <UploadBackgroundImage location='shows' />
          <ChangeHeader page='shows' />
          <AddNewShowDate />
        </Stack>
      </Tabs.Panel>

      <Tabs.Panel value="gallery">
      <Stack
          className={styles.stack}
          align="stretch"
          justify="center"
          gap="md"
          px={40}
        >
          <UploadBackgroundImage location='gallery' />
          <ChangeHeader page='gallery' />
          <AddNewPicturesToGallery />
        </Stack>
      </Tabs.Panel>

      <Tabs.Panel value="videos">
        <Stack
          className={styles.stack}
          align="stretch"
          justify="center"
          gap="md"
          px={40}
        >
          <UploadBackgroundImage location='videos' />
          <ChangeHeader page='videos' />
          <AddNewVideo />
        </Stack>
      </Tabs.Panel>

      <Tabs.Panel value="contact" className={styles.panel}>
        <Stack
          className={styles.stack}
          align="stretch"
          justify="center"
          gap="md"
          px={40}
        >
          <UploadBackgroundImage location='contact' />
          <ChangeHeader page='contact' />
        </Stack>
      </Tabs.Panel>
    </Tabs>
  );
}