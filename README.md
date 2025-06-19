# AI Stock Summary Dashboard

A modern, responsive stock market dashboard powered by AI that provides real-time stock data, news analysis, and intelligent investment insights.

## 🚀 Features

- **Real-time Stock Data**: Live stock prices, charts, and market data
- **AI-Powered Analysis**: Gemini AI summarizes stock news into actionable insights
- **Interactive Charts**: 30-day price trend visualization
- **Latest News**: Recent stock-related news with sentiment analysis
- **Responsive Design**: Beautiful UI that works on all devices
- **Dark Mode Support**: Toggle between light and dark themes

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **AI Integration**: Google Gemini AI
- **Stock Data**: Alpha Vantage API
- **Icons**: Lucide React

## 📦 Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd ai-stock-dashboard
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env
   \`\`\`
   
   Add your API keys to `.env`:
   - Get Alpha Vantage API key: https://www.alphavantage.co/support/#api-key
   - Get Gemini API key: https://makersuite.google.com/app/apikey

4. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

## 🔧 Configuration

### API Keys Required

1. **Alpha Vantage API** (Free tier available)
   - Provides stock data and news
   - 25 requests per day on free tier
   - Sign up at: https://www.alphavantage.co/

2. **Google Gemini API** (Free tier available)
   - Powers AI news summarization
   - Generous free quota
   - Get key at: https://makersuite.google.com/

### Environment Variables

\`\`\`env
VITE_ALPHA_VANTAGE_API_KEY=your_alpha_vantage_key
VITE_GEMINI_API_KEY=your_gemini_key
\`\`\`

## 🏗️ Project Structure

\`\`\`
src/
├── components/          # React components
│   ├── SearchBar.tsx   # Stock search interface
│   ├── StockCard.tsx   # Stock data display
│   ├── StockChart.tsx  # Price chart component
│   ├── NewsSection.tsx # News display
│   ├── AISummary.tsx   # AI-generated insights
│   └── ...
├── hooks/              # Custom React hooks
│   ├── useStockData.ts # Stock data management
│   └── useAISummary.ts # AI summary generation
├── services/           # API services
│   ├── stockService.ts # Alpha Vantage integration
│   └── aiService.ts    # Gemini AI integration
├── types/              # TypeScript definitions
└── App.tsx            # Main application component
\`\`\`

## 🎯 Usage

1. **Search for a stock** by entering a symbol (e.g., AAPL, GOOGL) or company name
2. **View real-time data** including price, volume, and daily changes
3. **Analyze the chart** to see 30-day price trends
4. **Read AI insights** generated from recent news
5. **Browse latest news** with direct links to sources

## 🚀 Deployment

### Build for production
\`\`\`bash
npm run build
\`\`\`

### Deploy to Vercel
\`\`\`bash
npm install -g vercel
vercel --prod
\`\`\`

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Set environment variables in Netlify dashboard

## 🔒 Security Notes

- API keys are stored in environment variables
- All API calls are made from the client side
- No sensitive data is stored locally
- CORS is handled by the APIs

## 📈 Performance

- Lazy loading for components
- Optimized API calls with error handling
- Responsive images and charts
- Minimal bundle size with tree shaking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Troubleshooting

### Common Issues

1. **API Key Errors**
   - Ensure your API keys are correctly set in `.env`
   - Check that your Alpha Vantage key is active
   - Verify Gemini API key permissions

2. **CORS Issues**
   - Alpha Vantage API supports CORS
   - If issues persist, consider using a proxy

3. **Rate Limiting**
   - Alpha Vantage free tier: 25 requests/day
   - Implement caching for production use

### Support

For issues and questions:
- Check the GitHub issues
- Review API documentation
- Contact support through the respective API providers
