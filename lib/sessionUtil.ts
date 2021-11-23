import { Session } from 'next-auth'

export const getUsername = (session: Session) => {
  if (!session) {
    return 'no-session'
  }
  return '' + (session?.user?.name || session?.user?.email || 'unknown')
}
