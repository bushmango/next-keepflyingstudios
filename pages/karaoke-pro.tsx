import type { NextPage } from 'next'
import React from 'react'
import { Footer } from '../components/layout/Footer'
import { HeadTitle } from '../components/layout/HeadTitle'
import styles from '../styles/Home.module.css'

const KaraokeProPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <HeadTitle title='Karaoke Pro Software' />

      <main className={styles.main}>
        <h1 className={styles.title}>Karaoke Pro Software</h1>

        <p className={styles.description}>Coming soon</p>

        <div>Codename Karaoke Pro</div>
      </main>

      <Footer />
    </div>
  )
}

export default KaraokeProPage
