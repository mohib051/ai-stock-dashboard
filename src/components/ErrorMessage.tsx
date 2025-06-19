"use client"

import { AlertCircle, RefreshCw } from "lucide-react"

interface ErrorMessageProps {
  message: string
  onRetry: () => void
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
      <div className="flex items-center space-x-3">
        <AlertCircle className="h-6 w-6 text-red-600" />
        <div className="flex-1">
          <h3 className="font-medium text-red-900 dark:text-red-200">Error</h3>
          <p className="text-red-700 dark:text-red-300 mt-1">{message}</p>
        </div>
        <button
          onClick={onRetry}
          className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Retry</span>
        </button>
      </div>
    </div>
  )
}
