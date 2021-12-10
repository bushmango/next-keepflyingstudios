/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

// interface ITokenData {
//   user_id: string
//   email: string
//   user_access_token: string
// }

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session = await getSession(context)

//   if (session && session.user) {
//     // const data = await prismaClient.user.findUnique({
//     //   where: {
//     //     email: session.user.email,
//     //   },
//     //   select: {
//     //     id: true,
//     //     email: true,
//     //     custom_access_token: true,
//     //   },
//     // })
//     return {
//       props: {
//         data: {
//           user_id: session.user_id,
//           user_email: session.user?.email || '',
//           user_name: session.user?.name || '',
//           user_access_token: session.user_access_token,
//         },
//       },
//     }
//   }

//   return { props: {} }
// }

// const AppGetTokenPage: InferGetServerSidePropsType<typeof getServerSideProps> =
//   (props: { data?: ITokenData }) => {

const AppGetTokenPage: NextPage = () => {
  const { status, data } = useSession()
  const [tokenData, setTokenData] = useState('')
  let session = data
  useEffect(() => {
    if (window && window.top) {
      if (status === 'authenticated') {
        if (session) {
          setTokenData(
            JSON.stringify(
              {
                user_id: session.user_id,
                user_email: session.user?.email || '',
                user_name: session.user?.name || '',
                user_access_token: session.user_access_token,
              },
              null,
              2,
            ),
          )
        }
      }
    }
  }, [status, session])

  return (
    <div>
      Getting token data... {'' + status}
      <pre>{tokenData}</pre>
    </div>
  )
}

export default AppGetTokenPage
