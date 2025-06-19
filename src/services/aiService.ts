import { GoogleGenerativeAI } from "@google/generative-ai"
import type { NewsItem } from "../types"

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_KEY
// console.log("GEMINI_API_KEY:", GEMINI_API_KEY)
class AIService {
  private genAI: GoogleGenerativeAI

  constructor() {
    if (!GEMINI_API_KEY) {
      throw new Error("Gemini API key is not configured")
    }
    this.genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
  }

  async generateNewsSummary(news: NewsItem[], symbol: string): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

      const newsText = news
        .slice(0, 5)
        .map((item) => `Title: ${item.title}\nSummary: ${item.summary}`)
        .join("\n\n")

      const prompt = `
        As a financial analyst, analyze the following recent news about ${symbol} and provide a concise investment summary in 3-5 sentences. Focus on:
        1. Key developments and their potential impact
        2. Market sentiment and trends
        3. Investment implications (opportunities/risks)
        4. Overall outlook

        Recent News:
        ${newsText}

        Please provide a balanced, professional analysis suitable for investors. Avoid giving direct financial advice.
      `

      const result = await model.generateContent(prompt)
      const response = await result.response
      return response.text()
    } catch (error) {
      console.error("Error generating AI summary:", error)
      throw new Error("Failed to generate AI summary. Please try again later.")
    }
  }
}

export const aiService = new AIService()
