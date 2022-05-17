import Router from "express"
import { dirname } from "path"
import { fileURLToPath } from 'url'
import fs from "fs"
import { data } from "./db.js"
import { ErrorMessages } from "./utils.js"

const ScriptRoutes = Router()

const source = fs.readFileSync(dirname(fileURLToPath(import.meta.url)) + '/client.js').toString()

ScriptRoutes.get("/", async (req, res, next) => {
  try {
    const seed = {
      ip : req.ip,
      time : new Date()
    }
    await data.insertOne(seed)
    return res.status(200).setHeader("Content-Type", "text/javascript").send(source.replace("$DATA_ID", seed._id).replace("$CALLBACK_URL", process.env.SCRIPT_CALLBACK_URL))
  }
  catch (e) {
    console.log(e)
    return res.status(500).json(ErrorMessages.ServerError)
  }
});

export default ScriptRoutes