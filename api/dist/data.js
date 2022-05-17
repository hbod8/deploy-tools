"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_js_1 = require("./db.js");
const mongodb_1 = require("mongodb");
const utils_js_1 = require("./utils.js");
const auth_js_1 = require("./auth.js");
const DataRoutes = (0, express_1.default)();
DataRoutes.put("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.id) {
        return res.status(400).json(utils_js_1.ErrorMessages.BadRequest);
    }
    const filter = { _id: new mongodb_1.ObjectId(req.query.id) };
    const update = {
        $set: {
            fingerprint: req.body.fingerprint,
            protocol: req.body.protocol,
            hostname: req.body.hostname,
            pathname: req.body.pathname,
            search: req.body.search,
            hash: req.body.hash,
            language: req.headers["accept-language"],
            device: req.headers["user-agent"],
            ip2: req.ip,
            time2: new Date()
        }
    };
    try {
        const qr = yield (yield db_js_1.data.findOneAndUpdate(filter, update)).value;
        if (!qr) {
            return res.status(400).json(utils_js_1.ErrorMessages.BadRequest);
        }
        return res.status(200).json(qr);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json(utils_js_1.ErrorMessages.ServerError);
    }
}));
DataRoutes.get("/", auth_js_1.authorize, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const q = yield db_js_1.data.find().toArray();
        return res.status(200).json(q);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json(utils_js_1.ErrorMessages.ServerError);
    }
}));
DataRoutes.get("/summary", auth_js_1.authorize, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.hostname) {
        try {
            const query = [
                {
                    $group: {
                        _id: "$hostname",
                        requests: {
                            $count: {}
                        }
                    }
                },
                {
                    $sort: {
                        requests: -1
                    }
                },
                {
                    $project: {
                        _id: 0,
                        hostname: "$_id",
                        requests: "$requests"
                    }
                },
                {
                    $limit: 10
                }
            ];
            const body = {
                hostnames: yield db_js_1.data.aggregate(query).toArray()
            };
            return res.status(200).json(body);
        }
        catch (e) {
            console.log(e);
            return res.status(500).json(utils_js_1.ErrorMessages.ServerError);
        }
    }
    else {
        try {
            const userAgentQuery = [
                {
                    $match: {
                        hostname: req.query.hostname
                    }
                },
                {
                    $group: {
                        _id: "$device",
                        requests: {
                            $count: {}
                        }
                    }
                },
                {
                    $sort: {
                        requests: -1
                    }
                },
                {
                    $project: {
                        _id: 0,
                        device: "$_id",
                        requests: "$requests"
                    }
                },
                {
                    $limit: 10
                }
            ];
            const fingerprintQuery = [
                {
                    $match: {
                        hostname: req.query.hostname
                    }
                },
                {
                    $group: {
                        _id: "$fingerprint",
                        requests: {
                            $count: {}
                        }
                    }
                },
                {
                    $sort: {
                        requests: -1
                    }
                },
                {
                    $project: {
                        _id: 0,
                        fingerprint: "$_id",
                        requests: "$requests"
                    }
                },
                {
                    $limit: 10
                }
            ];
            const ipQuery = [
                {
                    $match: {
                        hostname: req.query.hostname
                    }
                },
                {
                    $group: {
                        _id: "$ip",
                        requests: {
                            $count: {}
                        }
                    }
                },
                {
                    $sort: {
                        requests: -1
                    }
                },
                {
                    $project: {
                        _id: 0,
                        ip: "$_id",
                        requests: "$requests"
                    }
                },
                {
                    $limit: 10
                }
            ];
            const languageQuery = [
                {
                    $match: {
                        hostname: req.query.hostname
                    }
                },
                {
                    $group: {
                        _id: "$language",
                        requests: {
                            $count: {}
                        }
                    }
                },
                {
                    $sort: {
                        requests: -1
                    }
                },
                {
                    $project: {
                        _id: 0,
                        language: "$_id",
                        requests: "$requests"
                    }
                },
                {
                    $limit: 10
                }
            ];
            const pagesQuery = [
                {
                    $match: {
                        hostname: req.query.hostname
                    }
                },
                {
                    $group: {
                        _id: "$pathname",
                        requests: {
                            $count: {}
                        }
                    }
                },
                {
                    $sort: {
                        requests: -1
                    }
                },
                {
                    $project: {
                        _id: 0,
                        pathname: "$_id",
                        requests: "$requests"
                    }
                },
                {
                    $limit: 10
                }
            ];
            const body = {
                devices: yield db_js_1.data.aggregate(userAgentQuery).toArray(),
                fingerprints: yield db_js_1.data.aggregate(fingerprintQuery).toArray(),
                ips: yield db_js_1.data.aggregate(ipQuery).toArray(),
                languages: yield db_js_1.data.aggregate(languageQuery).toArray(),
                pages: yield db_js_1.data.aggregate(pagesQuery).toArray()
            };
            return res.status(200).json(body);
        }
        catch (e) {
            console.log(e);
            return res.status(500).json(utils_js_1.ErrorMessages.ServerError);
        }
    }
}));
exports.default = DataRoutes;
//# sourceMappingURL=data.js.map