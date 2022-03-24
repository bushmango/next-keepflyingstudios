import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { getUsername } from '../../lib/sessionUtil'
import { ErrorBoundary } from '../core/ErrorBoundary'
import { Email } from './Email'
import styles from './layout.module.scss'

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
        <Link href={'/privacy-policy'}>Privacy Policy</Link>
        <Link href={'/terms-of-service'}>Terms of Service</Link>
      </ErrorBoundary>
    </footer>
  )
}
