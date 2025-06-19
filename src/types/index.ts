export interface StockData {
  symbol: string
  name: string
  price: number
  change: number
  high: number
  low: number
  volume: number
  lastUpdated: string
  timeSeriesData: TimeSeriesData[]
  news: NewsItem[]
}

export interface TimeSeriesData {
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export interface NewsItem {
  title: string
  url: string
  time_published: string
  summary: string
  source: string
  sentiment_score?: number
}
