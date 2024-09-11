'use client'
import { useDisclosure } from '@mantine/hooks';
import { Burger, NavLink, Avatar } from '@mantine/core';
import { GrHomeRounded } from "react-icons/gr";
import { GrGallery } from "react-icons/gr";
import { BiSolidVideos } from "react-icons/bi";
import { FaCalendarDays } from "react-icons/fa6";
import { GrContact } from "react-icons/gr";
import { FaKey } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import styles from './SideNav.module.css';

export const SideNav = ({ session }:any) => {
  const [opened, { toggle }] = useDisclosure();
  return (
    <div className={'fixed top-0 left-0 bg-slate-800 h-full p-4 flex flex-col items-center ' + styles.container}>
      <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" size='lg' color='white' className={styles.navLink} />
      {opened ? <OpenNav /> : <ClosedNav />}
      <div className='items-center'>
        {session ? (
          <NavLink
            className={styles.navLinkChild}  
            href='api/auth/signout'
            label={
              <Avatar
                src={session.user.image}
                alt={session.user.name}
                size='md'
              />
            }
          />
        ) : (
          opened ? (
            <div className={styles.navLink}>
              <NavLink
                href='api/auth/signin'
                className={styles.navLinkChild}
                label={<p className='text-xl'>Sign In</p>}
                leftSection={<FaKey className='h-6 w-6' />}
              />
            </div>
          ) : (
            <div className={styles.navLink}>
              <NavLink
                href='api/auth/signin'
                className={styles.navLinkChild}
                label={<FaKey className='h-6 w-6' />}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
}

const OpenNav = () => {
  return (
    <div className='flex flex-col justify-around h-full'>
      <div className={styles.navLink}>
        <NavLink
          className={styles.navLinkChild}
          href='/'
          label={<p className='text-xl'>Home</p>}
          leftSection={<GrHomeRounded className='h-6 w-6' />}
        />
      </div>
      <div className={styles.navLink}>
        <NavLink
          className={styles.navLinkChild}
          href='/shows'
          label={<p className='text-xl'>Show Dates</p>}
          leftSection={<FaCalendarDays className='h-6 w-6' />}
        />
      </div>
      <div className={styles.navLink}>
        <NavLink
          className={styles.navLinkChild}
          href='/gallery'
          label={<p className='text-xl'>Gallery</p>}
          leftSection={<GrGallery className='h-6 w-6' />}
        />
      </div>
      <div className={styles.navLink}>
        <NavLink
          className={styles.navLinkChild}
          href='/videos'
          label={<p className='text-xl'>Videos</p>}
          leftSection={<BiSolidVideos className='w-6 h-6' />}
        />
      </div>
      <div className={styles.navLink}>
        <NavLink
          className={styles.navLinkChild}
          href='/contact'
          label={<p className='text-xl'>Contact</p>}
          leftSection={<GrContact className='h-6 w-6' />}
        />
      </div>
      <div className={styles.navLink}>
        <NavLink
          className={styles.navLinkChild}
          href='/settings'
          label={<p className='text-xl'>Settings</p>}
          leftSection={<IoMdSettings className='h-6 w-6' />}
        />
      </div>
    </div>
  )
}

const ClosedNav = () => {
  return (
    <div className='flex flex-col justify-around h-full items-center'>
      <div className={styles.navLink}>
        <NavLink
          className={styles.navLinkChild}
          href='/'
          label={<GrHomeRounded className='h-8 w-8' />}
        />
      </div>
      <div className={styles.navLink}>
        <NavLink
          className={styles.navLinkChild}
          href='/shows'
          label={<FaCalendarDays className='h-8 w-8' />}
        />
      </div>
      <div className={styles.navLink}>
        <NavLink
          className={styles.navLinkChild}
          href='/gallery'
          label={<GrGallery className='h-8 w-8' />}
        />
      </div>
      <div className={styles.navLink}>
        <NavLink
          className={styles.navLinkChild}
          href='/videos'
          label={<BiSolidVideos className='h-8 w-8' />}
        />
      </div>
      <div className={styles.navLink}>
        <NavLink
          className={styles.navLinkChild}
          href='/contact'
          label={<GrContact className='h-8 w-8' />}
        />
      </div>
      <div className={styles.navLink}>
        <NavLink
          className={styles.navLinkChild}
          href='/settings'
          label={<IoMdSettings className='h-8 w-8' />}
        />
      </div>
    </div>
  )
}