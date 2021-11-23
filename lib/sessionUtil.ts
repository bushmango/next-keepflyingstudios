import { Session } from 'next-auth'

export const getUsername = (session: Session) => {
  return '' + (session?.user?.name || session?.user?.email || 'unknown')
}
