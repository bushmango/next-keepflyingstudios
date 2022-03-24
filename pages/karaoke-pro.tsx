import type { NextPage } from 'next'
import React from 'react'
import { Footer } from '../components/layout/Footer'
import { HeadTitle } from '../components/layout/HeadTitle'
import styles from '../styles/Home.module.scss'

const KaraokeProPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <HeadTitle title='Karaoke Pro Software' />

      <h1 className={styles.title}>Karaoke Pro Software</h1>

      <p className={styles.description}>Coming soon</p>

      <div>Codename Karaoke Pro</div>
    </div>
  )
}

export default KaraokeProPage
