import type { StockData, NewsItem, TimeSeriesData } from "../types"

const ALPHA_VANTAGE_API_KEY = import.meta.env.VITE_STOCK_API_KEY 
const BASE_URL = "https://www.alphavantage.co/query"

class StockService {
  async getStockData(symbol: string): Promise<StockData> {
    try {
      // Fetch current quote
      const quoteResponse = await fetch(
        `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`,
      )
      const quoteData = await quoteResponse.json()
      console.log("QUOTE RESPONSE:", quoteData)
      if (quoteData["Error Message"] || quoteData["Note"]) {
        throw new Error("Invalid symbol or API limit reached. Please try again later.")
      }

      const quote = quoteData["Global Quote"]
      if (!quote) {
        throw new Error("Stock data not found. Please check the symbol and try again.")
      }

      // Fetch time series data
      const timeSeriesResponse = await fetch(
        `${BASE_URL}?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`,
      )
      const timeSeriesData = await timeSeriesResponse.json()

      const timeSeries = timeSeriesData["Time Series (Daily)"] || {}
      const timeSeriesArray: TimeSeriesData[] = Object.entries(timeSeries)
        .slice(0, 30)
        .map(([date, data]: [string, any]) => ({
          date,
          open: Number.parseFloat(data["1. open"]),
          high: Number.parseFloat(data["2. high"]),
          low: Number.parseFloat(data["3. low"]),
          close: Number.parseFloat(data["4. close"]),
          volume: Number.parseInt(data["5. volume"]),
        }))

      // Fetch news
      const news = await this.getStockNews(symbol)

      const stockData: StockData = {
        symbol: quote["01. symbol"],
        name: quote["01. symbol"], // Alpha Vantage doesn't provide company name in this endpoint
        price: Number.parseFloat(quote["05. price"]),
        change: Number.parseFloat(quote["09. change"]),
        high: Number.parseFloat(quote["03. high"]),
        low: Number.parseFloat(quote["04. low"]),
        volume: Number.parseInt(quote["06. volume"]),
        lastUpdated: quote["07. latest trading day"],
        timeSeriesData: timeSeriesArray,
        news,
      }

      return stockData
    } catch (error) {
      console.error("Error fetching stock data:", error)
      throw error
    }
  }

  async getStockNews(symbol: string): Promise<NewsItem[]> {
    try {
      const response = await fetch(
        `${BASE_URL}?function=NEWS_SENTIMENT&tickers=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}&limit=10`,
      )
      const data = await response.json()

      if (data.feed && Array.isArray(data.feed)) {
        return data.feed.map((item: any) => ({
          title: item.title,
          url: item.url,
          time_published: item.time_published,
          summary: item.summary,
          source: item.source,
          sentiment_score: item.overall_sentiment_score,
        }))
      }

      return []
    } catch (error) {
      console.error("Error fetching news:", error)
      return []
    }
  }
}

export const stockService = new StockService()
