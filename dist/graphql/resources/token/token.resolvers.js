"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const utils_1 = require("../../../utils/utils");
exports.tokenResolvers = {
    Mutation: {
        authUser: (parent, { email, password }, { db }) => {
            return db.User.findOne({
                where: { email: email },
                attributes: ['id', 'password', 'player']
            }).then((user) => {
                let errorMessage = 'Não autorizado, e-mail ou senha errados!';
                if (!user || !user.isPassword(user.get('password'), password)) {
                    throw new Error(errorMessage);
                }
                const payload = { sub: user.get('playerId') };
                return {
                    token: jwt.sign(payload, utils_1.JWT_SECRET)
                };
            });
        }
    }
};
