import React, { type ErrorInfo } from 'react'
import { FaSadCry, FaSadTear } from 'react-icons/fa'

interface Props {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  key: number
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null, key: 0 }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.VITE_NODE_ENV === 'production') {
      //  Log to monitioring service
      // console.log('Error caught:', error, info)
    } else {
      console.error(error, info)
    }
  }

  handleRetry = () => {
    this.setState((prev: State) => ({
      hasError: false,
      error: null,
      key: prev.key + 1,
    }))
  }

  render() {
    if (this.state.hasError) {
      if (import.meta.env.VITE_NODE_ENV === 'development') {
        throw this.state.error
      }

      return (
        this.props.fallback || (
          <div className="my-5 text-center  text-red-800">
            <FaSadTear className="text-lg" />
            <h2 className="text-2xl">Sorry, something went wrong</h2>
            <button
              onClick={() => location.reload()}
              className="mx-auto mt-2 px-4 py-1 bg-dark border-0 text-white rounded"
            >
              Retry
            </button>
          </div>
        )
      )
    }

    return (
      <React.Fragment key={this.state.key}>
        {this.props.children}
      </React.Fragment>
    )
  }
}

export default ErrorBoundary
