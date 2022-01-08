import type { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import { Footer } from '../../components/layout/Footer'
import { HeadTitle } from '../../components/layout/HeadTitle'
import styles from '../../styles/Home.module.css'
import { LoggedInComponent } from '../account/login'

const ImpulseSubPixelPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <HeadTitle title='Impulse Sub-Pixel Editing Software' />

      <main className={styles.main}>
        <h1 className={styles.title}>Subpixelator Sub-Pixel Editor</h1>
        <h3>Brenden Preview Alpha Release</h3>

        <p className={styles.description}></p>

        <p style={{ fontSize: '40px' }}>
          First, sign in <br />
          <LoggedInComponent />
        </p>

        <p style={{ fontSize: '40px' }}>
          <a href='/impulse-sub-pixel/sub-pixel-app.html'>Then, try it</a>
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
