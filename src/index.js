import React from "react"
import ReactDOM from "react-dom"
import Routes from "./routes"
import registerServiceWorker from "./registerServiceWorker"
import "./styles/index.css"

ReactDOM.render(<Routes />, document.getElementById("app"))
registerServiceWorker()
