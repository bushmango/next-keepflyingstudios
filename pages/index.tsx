import type { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import { Email } from '../components/layout/Email'
import { Footer } from '../components/layout/Footer'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Keep Flying Studios LLC</h1>

      <p className={styles.description}>
        NextJS / React / Typescript / NodeJS Experts
      </p>

      <div className={styles.grid}>
        <Link href='/impulse-sub-pixel' passHref>
          <div className={styles.card}>
            <h2>Subpixelator.io Sub-Pixel Editor&rarr;</h2>
            <p>Sub-pixel rendering software.</p>
          </div>
        </Link>
        {/* <Link href='/karaoke-pro' passHref>
            <div className={styles.card}>
              <h2>Karaoke Pro &rarr;</h2>
              <p>Professional Karaoke Software.</p>
            </div>
          </Link> */}
        {/* <a href='https://cowsayify.com' className={styles.card}>
            <h2>Cowsayify &rarr;</h2>
            <p>NextJS demo app.</p>
          </a> */}

        <div className={styles.card}>
          <h2>Contact Us</h2>
          <p>
            <Email />
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
