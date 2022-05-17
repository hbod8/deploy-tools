import * as db from "./db.js"
import UserRoutes from "./user.js"
import DataRoutes from "./data.js"
import ScriptRoutes from "./scripts.js"
import express from "express"
import morgan from "morgan"

const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(morgan('tiny'))

app.use("/data", DataRoutes)
app.use("/user", UserRoutes)
app.use("/scripts", ScriptRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`)
})