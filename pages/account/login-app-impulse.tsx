import type { NextPage } from 'next'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { Footer } from '../../components/layout/Footer'
import { HeadTitle } from '../../components/layout/HeadTitle'
import { getQueryStringParameterByName } from '../../lib/getQueryString'
import styles from '../../styles/Home.module.css'

function LoggedInComponent() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
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

      <main className={styles.main}>
        <h1 className={styles.title}>Login (Impulse Sub-Pixel Editor)</h1>
        <LoggedInComponent />
        <br />
        {url && <Link href={url}>Back to Editor</Link>}
      </main>

      {/* <SupabaseAuth /> */}

      <Footer />
    </div>
  )
}

export default LoginPage
