import type { TimeSeriesData } from "../types"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface StockChartProps {
  data: TimeSeriesData[]
  symbol: string
}

export function StockChart({ data, symbol }: StockChartProps) {
  const chartData = data
    .slice(0, 30)
    .reverse()
    .map((item) => ({
      date: new Date(item.date).toLocaleDateString(),
      price: Number.parseFloat(item.close),
      volume: item.volume,
    }))

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">{symbol} - 30 Day Price Chart</h3>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} className="text-slate-600 dark:text-slate-400" />
            <YAxis tick={{ fontSize: 12 }} className="text-slate-600 dark:text-slate-400" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgb(30 41 59)",
                border: "none",
                borderRadius: "8px",
                color: "white",
              }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, "Price"]}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "#3b82f6" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
