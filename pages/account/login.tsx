import type { NextPage } from 'next'
import React from 'react'
import { Footer } from '../../components/layout/Footer'
import { HeadTitle } from '../../components/layout/HeadTitle'
import styles from '../../styles/Home.module.css'

const LoginPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <HeadTitle title='Login' />

      <main className={styles.main}>
        <h1 className={styles.title}>Login</h1>

        <p className={styles.description}>Coming soon</p>
      </main>

      <Footer />
    </div>
  )
}

export default LoginPage
