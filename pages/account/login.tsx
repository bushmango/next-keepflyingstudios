import type { NextPage } from 'next'
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'
import { Footer } from '../../components/layout/Footer'
import { HeadTitle } from '../../components/layout/HeadTitle'
import styles from '../../styles/Home.module.css'

function LoggedInComponent() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}

const LoginPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <HeadTitle title='Login' />

      <main className={styles.main}>
        <h1 className={styles.title}>Login</h1>

        <p className={styles.description}>Coming soon</p>

        <LoggedInComponent />
      </main>

      {/* <SupabaseAuth /> */}

      <Footer />
    </div>
  )
}

export default LoginPage
