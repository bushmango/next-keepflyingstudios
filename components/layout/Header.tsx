import Link from 'next/link'
import React from 'react'
import styles from './layout.module.scss'
import { ErrorBoundary } from '../core/ErrorBoundary'

export const Header = () => {
  return (
    <header className={styles.header}>
      <ErrorBoundary name='header'>
        <Link href={'/'}>Keep Flying Studios</Link> /{' '}
        <Link href={'/impulse-sub-pixel'}>Subpixelator.io</Link>
      </ErrorBoundary>
    </header>
  )
}
