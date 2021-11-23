/* eslint-disable @next/next/no-img-element */
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { getSession } from 'next-auth/react'
import { useEffect } from 'react'
import { prismaClient } from '../../lib/prisma'

interface ITokenData {
  id: string
  email: string
  custom_access_token: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (session && session.user && session.user.email) {
    const data = await prismaClient.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
        email: true,
        custom_access_token: true,
      },
    })
    return { props: { data } }
  }

  return { props: {} }
}

const AppGetTokenPage: InferGetServerSidePropsType<typeof getServerSideProps> =
  (props: { data?: ITokenData }) => {
    useEffect(() => {
      console.log('use effect fired!')
      if (window && window.top) {
        window.top.postMessage('tokens:' + JSON.stringify(props.data), '*')
      }
    }, [])

    return (
      <div>
        Token data
        <pre>{JSON.stringify(props.data, null, 2)}</pre>
      </div>
    )
  }

export default AppGetTokenPage
