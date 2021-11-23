/* eslint-disable @next/next/no-img-element */
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { getSession } from 'next-auth/react'
import { useEffect } from 'react'

interface ITokenData {
  user_id: string
  email: string
  user_access_token: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (session && session.user && session.user.email) {
    // const data = await prismaClient.user.findUnique({
    //   where: {
    //     email: session.user.email,
    //   },
    //   select: {
    //     id: true,
    //     email: true,
    //     custom_access_token: true,
    //   },
    // })
    return {
      props: {
        data: {
          user_id: session.user_id,
          email: session.user?.email || '',
          user_access_token: session.user_access_token,
        },
      },
    }
  }

  return { props: {} }
}

const AppGetTokenPage: InferGetServerSidePropsType<typeof getServerSideProps> =
  (props: { data?: ITokenData }) => {
    useEffect(() => {
      if (window && window.top) {
        let tokenData = ''
        if (props.data) {
          tokenData = JSON.stringify(props.data)
        }
        window.top.postMessage('tokens:' + tokenData, '*')
      }
    }, [])

    return (
      <div>
        Getting token data...
        {/* <pre>{JSON.stringify(props.data, null, 2)}</pre> */}
      </div>
    )
  }

export default AppGetTokenPage
