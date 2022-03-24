import '../styles/globals.css'
import type { AppProps } from 'next/app'

// pages/_app.js
import { SessionProvider } from 'next-auth/react'
import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'
import { DefaultLayout } from '../components/layout/DefaultLayout'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? DefaultLayout

  return (
    <SessionProvider session={session}>
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  )
}

export default App
