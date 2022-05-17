import Router from "express"
import { data } from "./db.js"
import { ObjectId } from "mongodb"
import { ErrorMessages } from "./models/ErrorMessages.js"
import { authorize } from "./Auth.js"

const DataRoutes = Router()

DataRoutes.put("/", async (req, res, next) => {
  if (!req.query.id) {
    return res.status(400).json(ErrorMessages.BadRequest)
  }
  const filter = { _id : new ObjectId(req.query.id) }
  const update = {
    $set : {
      fingerprint : req.body.fingerprint,
      protocol : req.body.protocol,
      hostname: req.body.hostname,
      pathname : req.body.pathname,
      search : req.body.search,
      hash : req.body.hash,
      language : req.headers["accept-language"],
      device : req.headers["user-agent"],
      ip2 : req.ip,
      time2 : new Date()
    }
  }
  try {
    const qr = await (await data.findOneAndUpdate(filter, update)).value
    if (!qr) {
      return res.status(400).json(ErrorMessages.BadRequest)
    }
    return res.status(200).json(qr)
  }
  catch (e) {
    console.log(e)
    return res.status(500).json(ErrorMessages.ServerError)
  }
});

DataRoutes.get("/", authorize, async (req, res, next) => {
  try {
    const q = await data.find().toArray()
    return res.status(200).json(q)
  }
  catch (e) {
    console.log(e)
    return res.status(500).json(ErrorMessages.ServerError)
  }
});

DataRoutes.get("/summary", authorize, async (req, res, next) => {
  if (!req.query.hostname) {
    try {
      const query = [
        {
          $group : {
            _id : "$hostname",
            requests : {
              $count : { }
            }
          }
        },
        {
          $sort : {
            requests : -1
          }
        },
        {
          $project : {
            _id : 0,
            hostname: "$_id",
            requests : "$requests"
          }
        },
        {
          $limit : 10
        }
      ]
      const body = {
        hostnames : await data.aggregate(query).toArray()
      }
      return res.status(200).json(body)
    }
    catch (e) {
      console.log(e)
      return res.status(500).json(ErrorMessages.ServerError)
    }
  } else {
    try {
      const userAgentQuery = [
        {
          $match : {
            hostname : req.query.hostname
          }
        },
        {
          $group : {
            _id : "$device",
            requests : {
              $count : { }
            }
          }
        },
        {
          $sort : {
            requests : -1
          }
        },
        {
          $project : {
            _id : 0,
            device : "$_id",
            requests : "$requests"
          }
        },
        {
          $limit : 10
        }
      ]
      const fingerprintQuery = [
        {
          $match : {
            hostname : req.query.hostname
          }
        },
        {
          $group : {
            _id : "$fingerprint",
            requests : {
              $count : { }
            }
          }
        },
        {
          $sort : {
            requests : -1
          }
        },
        {
          $project : {
            _id : 0,
            fingerprint : "$_id",
            requests : "$requests"
          }
        },
        {
          $limit : 10
        }
      ]
      const ipQuery = [
        {
          $match : {
            hostname : req.query.hostname
          }
        },
        {
          $group : {
            _id : "$ip",
            requests : {
              $count : { }
            }
          }
        },
        {
          $sort : {
            requests : -1
          }
        },
        {
          $project : {
            _id : 0,
            ip : "$_id",
            requests : "$requests"
          }
        },
        {
          $limit : 10
        }
      ]
      const languageQuery = [
        {
          $match : {
            hostname : req.query.hostname
          }
        },
        {
          $group : {
            _id : "$language",
            requests : {
              $count : { }
            }
          }
        },
        {
          $sort : {
            requests : -1
          }
        },
        {
          $project : {
            _id : 0,
            language : "$_id",
            requests : "$requests"
          }
        },
        {
          $limit : 10
        }
      ]
      const pagesQuery = [
        {
          $match : {
            hostname : req.query.hostname
          }
        },
        {
          $group : {
            _id : "$pathname",
            requests : {
              $count : { }
            }
          }
        },
        {
          $sort : {
            requests : -1
          }
        },
        {
          $project : {
            _id : 0,
            pathname : "$_id",
            requests : "$requests"
          }
        },
        {
          $limit : 10
        }
      ]
      const body = {
        devices : await data.aggregate(userAgentQuery).toArray(),
        fingerprints : await data.aggregate(fingerprintQuery).toArray(),
        ips : await data.aggregate(ipQuery).toArray(),
        languages : await data.aggregate(languageQuery).toArray(),
        pages : await data.aggregate(pagesQuery).toArray()
      }
      return res.status(200).json(body)
    }
    catch (e) {
      console.log(e)
      return res.status(500).json(ErrorMessages.ServerError)
    }
  }
})

export default DataRoutes;