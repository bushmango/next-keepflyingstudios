import type { NextPage } from 'next'
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'
import { ErrorBoundary } from '../../components/core/ErrorBoundary'
import { Footer } from '../../components/layout/Footer'
import { HeadTitle } from '../../components/layout/HeadTitle'
import { getUsername } from '../../lib/sessionUtil'
import styles from '../../styles/Home.module.scss'

export function LoggedInComponent() {
  const { data: session } = useSession()
  if (session) {
    let username = getUsername(session)

    return (
      <>
        Signed in as {username} <br />
        <button onClick={() => signOut()}>Sign out</button>
        {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
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

      <h1 className={styles.title}>Login</h1>
      <ErrorBoundary>
        <LoggedInComponent />
      </ErrorBoundary>

      {/* <SupabaseAuth /> */}
    </div>
  )
}

export default LoginPage
