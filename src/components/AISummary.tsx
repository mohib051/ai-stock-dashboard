import { Brain, Loader2, AlertCircle } from "lucide-react"

interface AISummaryProps {
  summary: string | null
  loading: boolean
  symbol: string
}

export function AISummary({ summary, loading, symbol }: AISummaryProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="flex items-center space-x-3">
          <Loader2 className="h-5 w-5 animate-spin text-purple-600" />
          <span className="text-slate-600 dark:text-slate-400">AI is analyzing {symbol} news...</span>
        </div>
      </div>
    )
  }

  if (!summary) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="flex items-center space-x-3 text-slate-500 dark:text-slate-400">
          <AlertCircle className="h-5 w-5" />
          <span>No AI summary available</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
            <Brain className="h-4 w-4 text-purple-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-slate-900 dark:text-white mb-2">Investment Insights for {symbol}</h4>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{summary}</p>
          </div>
        </div>
      </div>

      <div className="text-xs text-slate-500 dark:text-slate-400 text-center">
        <p>
          ⚠️ This AI-generated summary is for informational purposes only and should not be considered as financial
          advice.
        </p>
      </div>
    </div>
  )
}
