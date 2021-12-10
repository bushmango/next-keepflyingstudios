import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

const GetApiKeys: NextPage = () => {
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

export default GetApiKeys
