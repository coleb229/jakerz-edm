'use client'
import { useDisclosure } from '@mantine/hooks';
import { BackgroundImage, Burger, NavLink } from '@mantine/core';
import { GrHomeRounded } from "react-icons/gr";
import { GrGallery } from "react-icons/gr";
import { BiSolidVideos } from "react-icons/bi";
import { FaCalendarDays } from "react-icons/fa6";
import { GrContact } from "react-icons/gr";
import styles from './SideNav.module.css';

export const SideNav = () => {
  const [opened, { toggle }] = useDisclosure();
  return (
    <div className='fixed top-0 left-0 bg-slate-800 h-full p-4 flex flex-col items-center'>
      <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" size='xl' color='white' className='hover:bg-slate-800' />
      {opened ? <OpenNav /> : <ClosedNav />}
    </div>
  );
}

const OpenNav = () => {
  return (
    <div className='flex flex-col justify-around h-full'>
      <div className='text-white hover:bg-slate-800'>
        <NavLink
          href='/'
          color='white'
          className={styles.element}
          label={<p className='text-xl'>Home</p>}
          leftSection={<GrHomeRounded className='h-6 w-6' />}
        />
      </div>
      <div className='text-white'>
        <NavLink
          href='/shows'
          color='white'
          className={styles.element}
          label={<p className='text-xl'>Show Dates</p>}
          leftSection={<FaCalendarDays className='h-6 w-6' />}
        />
      </div>
      <div className='text-white'>
        <NavLink
          href='/gallery'
          className={styles.element}
          color='white'
          label={<p className='text-xl'>Gallery</p>}
          leftSection={<GrGallery className='h-6 w-6' />}
        />
      </div>
      <div className='text-white'>
        <NavLink
          href='/videos'
          className={styles.element}
          color='white'
          label={<p className='text-xl'>Videos</p>}
          leftSection={<BiSolidVideos className='w-6 h-6' />}
        />
      </div>
      <div className='text-white'>
        <NavLink
          href='/contact'
          className={styles.element}
          color='white'
          label={<p className='text-xl'>Contact</p>}
          leftSection={<GrContact className='h-6 w-6' />}
        />
      </div>
    </div>
  )
}

const ClosedNav = () => {
  return (
    <div className='flex flex-col justify-around h-full items-center'>
      <div className='text-white'>
        <NavLink
          href='/'
          className={styles.element}
          color='white'
          label={<GrHomeRounded className='h-10 w-10' />}
        />
      </div>
      <div className='text-white'>
        <NavLink
          href='/shows'
          className={styles.element}
          color='white'
          label={<FaCalendarDays className='h-10 w-10' />}
        />
      </div>
      <div className='text-white'>
        <NavLink
          href='/gallery'
          className={styles.element}
          color='white'
          label={<GrGallery className='h-10 w-10' />}
        />
      </div>
      <div className='text-white'>
        <NavLink
          href='/videos'
          className={styles.element}
          color='white'
          label={<BiSolidVideos className='h-10 w-10' />}
        />
      </div>
      <div className='text-white'>
        <NavLink
          href='/contact'
          className={styles.element}
          color='white'
          label={<GrContact className='h-10 w-10' />}
        />
      </div>
    </div>
  )
}