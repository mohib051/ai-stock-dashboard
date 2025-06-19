import type { NewsItem } from "../types"
import { ExternalLink, Clock } from "lucide-react"

interface NewsSectionProps {
  news: NewsItem[]
}

export function NewsSection({ news }: NewsSectionProps) {
  if (!news || news.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-500 dark:text-slate-400">No recent news available</p>
      </div>
    )
  }

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      {news.slice(0, 5).map((item, index) => (
        <div key={index} className="border-b border-slate-200 dark:border-slate-700 last:border-b-0 pb-4 last:pb-0">
          <div className="flex items-start space-x-3">
            <div className="flex-1">
              <h4 className="font-medium text-slate-900 dark:text-white line-clamp-2 mb-2">{item.title}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-2">{item.summary}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
                  <Clock className="h-3 w-3" />
                  <span>{new Date(item.time_published).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{item.source}</span>
                </div>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                >
                  <span>Read more</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
