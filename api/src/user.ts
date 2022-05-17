import Router from "express"
import { ErrorMessages } from "./models/ErrorMessages.js"
import { users } from "./db.js"
import * as crypto from "crypto"
import { authorize, authenticate, refresh } from "./Auth.js"

const UserRoutes = Router()

UserRoutes.get("/", authorize, async (req, res, next) => {
  try {
    const q = await users.find().toArray()
    return res.status(200).json(q)
  }
  catch (e) {
    console.log(e)
    return res.status(500).json(ErrorMessages.ServerError)
  }
})

UserRoutes.post("/login", authenticate)

UserRoutes.post("/refresh", refresh)

UserRoutes.post("/", async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json(ErrorMessages.BadRequest)
  }
  const hash = crypto.createHash('sha256').update(req.body.password).digest('hex')
  const document = await users.insertOne({ email : req.body.email, password : hash, authorized : "false" })
  return res.status(200).json({ id : document._id})
})

export default UserRoutes;