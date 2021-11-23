import styles from '../../styles/Home.module.css'
import Image from 'next/image'
import { Email } from './Email'
import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { ErrorBoundary } from '../core/ErrorBoundary'
import { getUsername } from '../../lib/sessionUtil'

function LoggedInComponent() {
  const { data: session } = useSession()

  if (session) {
    let username = getUsername(session)
    return (
      <Link href='/account/login' passHref>
        <span>Signed in as {'' + username}</span>
      </Link>
    )
  }
  return <Link href='/account/login'>Sign in</Link>
}

export const Footer = () => {
  const { data: session } = useSession()

  return (
    <footer className={styles.footer}>
      <ErrorBoundary name='footer'>
        {/* <Link href='/api/auth/signin'>Sign in</Link> */}
        <ErrorBoundary name='login'>
          <LoggedInComponent />
        </ErrorBoundary>

        {/* <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
          </span>
        </a> */}
        <Email />
      </ErrorBoundary>
    </footer>
  )
}
