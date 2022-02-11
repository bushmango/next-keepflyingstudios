import React from 'react'

export const ClientOnly = (props: { children: React.ReactNode }) => {
  return (
    <div suppressHydrationWarning={true}>
      {process.browser && props.children}
    </div>
  )
}

export const ClientOnlyFunc = (props: { component: () => React.ReactNode }) => {
  return (
    <div suppressHydrationWarning={true}>
      {process.browser && props.component()}
      {!process.browser && '...'}
    </div>
  )
}
