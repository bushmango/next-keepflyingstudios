import type { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import { Footer } from '../../components/layout/Footer'
import { HeadTitle } from '../../components/layout/HeadTitle'
import styles from '../../styles/Home.module.css'

const ImpulseSubPixelPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <HeadTitle title='Impulse Sub-Pixel Editing Software' />

      <main className={styles.main}>
        <h1 className={styles.title}>Impulse Sub-Pixel</h1>

        <p className={styles.description}></p>

        <p>
          <a href='/impulse-sub-pixel/sub-pixel-app.html'>Try it</a>
        </p>

        <p>
          <Link href='/impulse-sub-pixel/list'>See examples</Link>
          {/* <a href="/impulse-sub-pixel/list">See examples</a> */}
        </p>

        <div>Codename Impulse Sub-Pixel</div>
      </main>

      <Footer />
    </div>
  )
}

export default ImpulseSubPixelPage
