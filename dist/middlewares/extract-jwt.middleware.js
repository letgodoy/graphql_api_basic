"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const models_1 = require("./../models");
const utils_1 = require("../utils/utils");
exports.extractJwtMiddleware = () => {
    return (req, res, next) => {
        let authorization = req.get('authorization');
        let token = authorization ? authorization.split(' ')[1] : undefined;
        req['context'] = {};
        req['context']['authorization'] = authorization;
        if (!token) {
            return next();
        }
        jwt.verify(token, utils_1.JWT_SECRET, (err, decoded) => {
            if (err) {
                return next();
            }
            models_1.default.User.findById(decoded.sub, {
                attributes: ['id', 'player']
            }).then((user) => {
                if (user) {
                    req['context']['authUser'] = {
                        id: user.get('id'),
                        playerId: user.get('player')
                    };
                }
                return next();
            });
        });
    };
};
