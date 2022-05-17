import * as db from "./db.js"
import UserRoutes from "./user.js"
import DataRoutes from "./data.js"
import ScriptRoutes from "./scripts.js"
import express from "express"
import morgan from "morgan"
import https from "https"
import fs from "fs"

const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(morgan('tiny'))

app.use("/data", DataRoutes)
app.use("/user", UserRoutes)
app.use("/scripts", ScriptRoutes)

const server = https.createServer({
  key: fs.readFileSync('../certs/privkey.pem'),
  cert: fs.readFileSync('../certs/fullchain.pem')
}, app)

server.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`)
})