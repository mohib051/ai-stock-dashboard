"use client"

import { useState } from "react"
import type { NewsItem } from "../types"
import { aiService } from "../services/aiService"

export function useAISummary() {
  const [summary, setSummary] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateSummary = async (news: NewsItem[], symbol: string) => {
    setLoading(true)
    setError(null)

    try {
      const generatedSummary = await aiService.generateNewsSummary(news, symbol)
      setSummary(generatedSummary)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to generate AI summary"
      setError(errorMessage)
      setSummary(null)
    } finally {
      setLoading(false)
    }
  }

  return {
    summary,
    loading,
    error,
    generateSummary,
  }
}
