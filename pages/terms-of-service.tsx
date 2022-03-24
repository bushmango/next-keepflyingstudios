import type { NextPage } from 'next'
import React from 'react'

import styles from '../../styles/Home.module.scss'
import { HeadTitle } from '../components/layout/HeadTitle'

const TermsOfServicePage: NextPage = () => {
  return (
    <div className={styles.container}>
      <HeadTitle title='Terms of Service' />
      <h3>Terms of Service</h3>

      <p>Terms of Service will go here</p>
    </div>
  )
}

export default TermsOfServicePage
