import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"

const root = document.getElementById("root")
if (!root) throw new Error("Target container is not a DOM element")

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
