import type { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import { HeadTitle } from '../../components/layout/HeadTitle'
import styles from '../../styles/Home.module.scss'
import { LoggedInComponent } from '../account/login'

const ImpulseSubPixelPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <HeadTitle title='Impulse Sub-Pixel Editing Software' />

      <h1 className={styles.title}>Subpixelator.io Sub-Pixel Editor</h1>
      <h3>Brenden Preview Alpha Release</h3>

      <p className={styles.description}></p>

      <p style={{ fontSize: '40px' }}>
        First, sign in <br />
        <LoggedInComponent />
      </p>

      <p style={{ fontSize: '40px' }}>
        <a href='/impulse-sub-pixel/sub-pixel-app.html'>
          Try Subpixelator.io and make your own Subpixelettes (Free Alpha)
        </a>
      </p>

      <p>
        <Link href='/impulse-sub-pixel/examples'>See examples</Link>
        <br />
        <Link href='/impulse-sub-pixel/list'>See work made by others</Link>
        {/* <a href="/impulse-sub-pixel/list">See examples</a> */}
      </p>

      <div>Codename Impulse Sub-Pixel</div>
    </div>
  )
}

export default ImpulseSubPixelPage
