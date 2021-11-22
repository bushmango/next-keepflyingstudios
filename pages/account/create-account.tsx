import { NextPage } from 'next'
import React from 'react'
import { Footer } from '../../components/layout/Footer'
import { HeadTitle } from '../../components/layout/HeadTitle'
import styles from '../../styles/Home.module.css'

const CreateAccount = () => {
  return (
    <div id='auth-view'>
      <h1>Create an account</h1>
      <form id='signup-form'>
        <input
          id='signup-username'
          type='text'
          required
          placeholder='Username'
        />
        <input
          id='signup-password'
          type='password'
          required
          placeholder='Password'
        />
        <input type='submit' value='Create an account' />
      </form>
      <div id='signup-error'></div>
    </div>
  )
}

const CreateAccountPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <HeadTitle title='Login' />

      <main className={styles.main}>
        <h1 className={styles.title}>Create Account</h1>
      </main>

      {/* <SupabaseAuth /> */}
      <CreateAccount />

      <Footer />
    </div>
  )
}

export default CreateAccountPage
