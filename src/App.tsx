"use client"

import { useState } from "react"
import { SearchBar } from "./components/SearchBar"
import { StockCard } from "./components/StockCard"
import { NewsSection } from "./components/NewsSection"
import { AISummary } from "./components/AISummary"
import { StockChart } from "./components/StockChart"
import { LoadingSpinner } from "./components/LoadingSpinner"
import { ErrorMessage } from "./components/ErrorMessage"
import { useStockData } from "./hooks/useStockData"
import { useAISummary } from "./hooks/useAISummary"
import { TrendingUp, BarChart3, Newspaper, Brain } from "lucide-react"

function App() {
  const [symbol, setSymbol] = useState<string>("")
  const { stockData, news, loading, error, fetchStockData } = useStockData()
  const { summary, loading: summaryLoading, generateSummary } = useAISummary()

  const handleSearch = async (searchSymbol: string) => {
    setSymbol(searchSymbol.toUpperCase())
    const data = await fetchStockData(searchSymbol)

    if (data && data.news && data.news.length > 0) {
      await generateSummary(data.news, searchSymbol)
    }
  }

  const handleRefresh = () => {
    if (symbol) {
      handleSearch(symbol)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">AI Stock Dashboard</h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Powered by Gemini AI & Real-time Market Data
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} loading={loading} />
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-8">
            <ErrorMessage message={error} onRetry={handleRefresh} />
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        )}

        {/* Results */}
        {stockData && !loading && (
          <div className="space-y-8">
            {/* Stock Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <StockCard stockData={stockData} onRefresh={handleRefresh} />
              </div>
              <div>
                <StockChart data={stockData.timeSeriesData} symbol={symbol} />
              </div>
            </div>

            {/* AI Summary & News */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Brain className="h-5 w-5 text-purple-600" />
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">AI Investment Summary</h2>
                  </div>
                  <AISummary summary={summary} loading={summaryLoading} symbol={symbol} />
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Newspaper className="h-5 w-5 text-blue-600" />
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Latest News</h2>
                  </div>
                  <NewsSection news={news} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!stockData && !loading && !error && (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
              <BarChart3 className="h-12 w-12 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Search for a Stock</h3>
            <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              Enter a stock symbol or company name to get real-time data, news, and AI-powered investment insights.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
