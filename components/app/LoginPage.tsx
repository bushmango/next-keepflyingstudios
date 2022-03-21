/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { signIn, signOut, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { ErrorBoundary } from '../../components/core/ErrorBoundary'
import { getUsername } from '../../lib/sessionUtil'
import { HeadTitle } from '../layout/HeadTitle'
import styles from './app.module.scss'

const namespace = 'impulse:app:login'

function LoginComponent() {
  const { data: session } = useSession()
  const [updateCount, setUpdateCount] = useState(1)
  useEffect(() => {
    // Auto-refresh
    if (!session) {
      setTimeout(() => setUpdateCount(updateCount + 1), 1000)
    }
  })

  if (session) {
    let username = getUsername(session)

    if (window && window.top) {
      window.top.postMessage(
        'logged-in:' +
          session?.user?.email +
          ':' +
          session?.user?.name +
          ':' +
          session?.user_id +
          ':' +
          session?.user_access_token,
        '*',
      )
    }

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
      <button onClick={() => signIn()}>Sign in</button> ({updateCount})
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return { props: { data: {}, err: '' } }
}

export const LoginPage: InferGetServerSidePropsType<
  typeof getServerSideProps
> = (props: { data: {}; err: string }) => {
  return (
    <div>
      <HeadTitle title='Login Subpixelator Subpix - Subpixelator Sub-Pixel Editing Software' />

      <main className={styles.main}>
        <h1>Login</h1>
        <div>
          <ErrorBoundary>
            <LoginComponent />
          </ErrorBoundary>
        </div>
        <div>{props.err && <div>{props.err}</div>}</div>
        {/* {!props.err && <div>Login info goes here</div>} */}
      </main>
    </div>
  )
}

LoginPage.getLayout = (page: NextPage) => {
  return <div>{page}</div>
}
