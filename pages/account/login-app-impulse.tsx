import type { NextPage } from 'next'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { ErrorBoundary } from '../../components/core/ErrorBoundary'
import { Footer } from '../../components/layout/Footer'
import { HeadTitle } from '../../components/layout/HeadTitle'
import { getQueryStringParameterByName } from '../../lib/getQueryString'
import { getUsername } from '../../lib/sessionUtil'
import styles from '../../styles/Home.module.scss'

function LoggedInComponent() {
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
  let [url, setUrl] = React.useState('')
  useEffect(() => {
    setUrl(getQueryStringParameterByName('redirect') || '')
  }, [])

  return (
    <div className={styles.container}>
      <HeadTitle title='Login (Impulse Sub-Pixel Editor)' />

      <h1 className={styles.title}>Login (Impulse Sub-Pixel Editor)</h1>
      <ErrorBoundary>
        <LoggedInComponent />
      </ErrorBoundary>
      <br />
      {url && <Link href={url}>Back to Editor</Link>}

      {/* <SupabaseAuth /> */}
    </div>
  )
}

export default LoginPage
