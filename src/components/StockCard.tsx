"use client"

import type { StockData } from "../types"
import { TrendingUp, TrendingDown, RefreshCw, DollarSign, BarChart3, Calendar } from "lucide-react"

interface StockCardProps {
  stockData: StockData
  onRefresh: () => void
}

export function StockCard({ stockData, onRefresh }: StockCardProps) {
  const isPositive = stockData.change >= 0
  const changePercent = ((stockData.change / (stockData.price - stockData.change)) * 100).toFixed(2)

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{stockData.symbol}</h2>
          <p className="text-slate-600 dark:text-slate-400">{stockData.name}</p>
        </div>
        <button
          onClick={onRefresh}
          className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        >
          <RefreshCw className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Price</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">${stockData.price.toFixed(2)}</p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            {isPositive ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Change</span>
          </div>
          <p className={`text-lg font-semibold ${isPositive ? "text-green-600" : "text-red-600"}`}>
            {isPositive ? "+" : ""}
            {stockData.change.toFixed(2)} ({changePercent}%)
          </p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <BarChart3 className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Volume</span>
          </div>
          <p className="text-lg font-semibold text-slate-900 dark:text-white">{stockData.volume.toLocaleString()}</p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Updated</span>
          </div>
          <p className="text-sm font-medium text-slate-900 dark:text-white">
            {new Date(stockData.lastUpdated).toLocaleTimeString()}
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">Day High</p>
          <p className="text-lg font-semibold text-slate-900 dark:text-white">${stockData.high.toFixed(2)}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">Day Low</p>
          <p className="text-lg font-semibold text-slate-900 dark:text-white">${stockData.low.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}
