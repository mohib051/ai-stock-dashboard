"use client"

import { useState } from "react"
import type { StockData, NewsItem } from "../types"
import { stockService } from "../services/stockService"

export function useStockData() {
  const [stockData, setStockData] = useState<StockData | null>(null)
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchStockData = async (symbol: string) => {
    setLoading(true)
    setError(null)

    try {
      const data = await stockService.getStockData(symbol)
      setStockData(data)
      setNews(data.news || [])
      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch stock data"
      setError(errorMessage)
      setStockData(null)
      setNews([])
      return null
    } finally {
      setLoading(false)
    }
  }

  return {
    stockData,
    news,
    loading,
    error,
    fetchStockData,
  }
}
