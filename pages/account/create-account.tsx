import { NextPage } from 'next'
import React from 'react'
import { Footer } from '../../components/layout/Footer'
import { HeadTitle } from '../../components/layout/HeadTitle'
import styles from '../../styles/Home.module.scss'

const CreateAccountPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <HeadTitle title='Create account' />
      <h1 className={styles.title}>Create Account</h1>
      this is not needed yet, just sign in with an email
    </div>
  )
}

export default CreateAccountPage
