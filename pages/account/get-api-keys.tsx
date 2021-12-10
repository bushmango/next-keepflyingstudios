import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

const GetApiKeysPage: NextPage = () => {
  const { status, data } = useSession()
  let session = data
  useEffect(() => {
    if (window && window.top) {
      let tokenData = ''
      if (status === 'authenticated') {
        tokenData = 'loading-session'
        if (session) {
          tokenData = JSON.stringify({
            user_id: session.user_id,
            user_email: session.user?.email || '',
            user_name: session.user?.name || '',
            user_access_token: session.user_access_token,
          })
        }
        window.top.postMessage('tokens:' + tokenData, '*')
      }
      if (status === 'unauthenticated') {
        window.top.postMessage('tokens:' + tokenData, '*')
      }
    }
  }, [status, session])

  return (
    <div>
      Getting api keys... {'' + status}
      {/* <pre>{JSON.stringify(props.data, null, 2)}</pre> */}
    </div>
  )
}

export default GetApiKeysPage
