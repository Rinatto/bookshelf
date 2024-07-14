import type React from "react"
import { ErrorBoundary } from "react-error-boundary"

import { ErrorFallback } from "./ErrorFallback"

interface WithErrorBoundaryProps {
  children: React.ReactNode
}

export const WithErrorBoundary: React.FC<WithErrorBoundaryProps> = ({
  children,
}) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
      {children}
    </ErrorBoundary>
  )
}
