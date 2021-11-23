import React from 'react'

export class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo)
    console.log('error-boundary', 'caught', error, errorInfo)
  }

  render() {
    if ((this.state as any).hasError) {
      // You can render any custom fallback UI
      return <div>Error boundary crash.</div>
    }

    return this.props.children
  }
}
