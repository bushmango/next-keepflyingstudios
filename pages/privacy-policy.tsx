import type { NextPage } from 'next'
import React from 'react'
import styles from '../../styles/Home.module.scss'
import { HeadTitle } from '../components/layout/HeadTitle'

const PrivacyPolicyPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <HeadTitle title='Privacy Policy' />
      <h3>Privacy Policy</h3>

      <p>Privacy Policy will go here</p>
    </div>
  )
}

export default PrivacyPolicyPage
