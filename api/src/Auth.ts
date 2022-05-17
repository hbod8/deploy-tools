import jwt from "jsonwebtoken"
import { users } from "./db.js"
import * as crypto from "crypto"
import { ErrorMessages } from "./utils.js"
import { ObjectId } from "mongodb"
import { Request, Response } from "express"

const tokenExp = 60 // 1 min
const refreshTokenExp = 3600 // 1 hr

export class Auth {
  authenticate(req: Request, res: Response, next: Function) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json(ErrorMessages.BadRequest)
    }
    const hash = crypto.createHash('sha256').update(req.body.password).digest('hex')
    const query = { email : req.body.email, password : hash }
    const user = await users.findOne(query)
    if (!user || !user.authorized || user.authorized != 'true') {
      return res.status(401).json(ErrorMessages.Unauthorized)
    }
    const token = jwt.sign({ type : "token", id : user._id }, process.env.JWT_SECRET, { algorithm : 'HS256', expiresIn : tokenExp })
    const refresh = jwt.sign({ type : "refresh token", id : user._id }, process.env.JWT_SECRET, { algorithm : 'HS256', expiresIn : refreshTokenExp })
    return res.status(200).json({ token : token, refresh : refresh })
  }
  authorize(req: Request, res: Response, next: Function) {
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")){
      return res.status(401).json(ErrorMessages.Unauthorized)
    }
    const token = req.headers.authorization.substring(7, req.headers.authorization.length);
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET)
      if (payload.type != 'token') {
        return res.status(401).json(ErrorMessages.Unauthorized)
      }
      next()
    } catch (e) {
      return res.status(401).json(ErrorMessages.Unauthorized)
    }
  }
  refresh(req: Request, res: Response, next: Function) {
    if (!req.body.token || !req.body.id){
      return res.status(400).json(ErrorMessages.BadRequest)
    }
    try {
      const payload = jwt.verify(req.body.token, process.env.JWT_SECRET)
      if (payload.type != 'refresh token') {
        return res.status(401).json(ErrorMessages.Unauthorized)
      }
    } catch (e) {
      return res.status(401).json(ErrorMessages.Unauthorized)
    }
    const query = { _id : new ObjectId(req.body.id) }
    const user = await users.findOne(query)
    if (!user || !user.authorized || user.authorized != 'true') {
      return res.status(401).json(ErrorMessages.Unauthorized)
    }
    const token = jwt.sign({ type : "token", id : user._id }, process.env.JWT_SECRET, { algorithm : 'HS256', expiresIn : tokenExp })
    return res.status(200).json({ token : token })
  }
}