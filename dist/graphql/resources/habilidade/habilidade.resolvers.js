"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils/utils");
const composable_resolver_1 = require("../../composable/composable.resolver");
const auth_resolver_1 = require("../../composable/auth.resolver");
exports.habilidadeResolvers = {
    Habilidade: {
        player: (habilidade, args, { db, dataloaders: { playerLoader } }, info) => {
            return playerLoader
                .load({ key: habilidade.get('player'), info })
                .catch(utils_1.handleError);
        }
    },
    Query: {
        allHabilidades: (parent, { first = 50, offset = 0 }, context, info) => {
            return context.db.Habilidade
                .findAll({
                limit: first,
                offset: offset,
                attributes: context.requestedFields.getFields(info, { keep: ['id'], exclude: ['player'] })
            }).catch(utils_1.handleError);
        },
        habilidade: (parent, { id }, context, info) => {
            id = parseInt(id);
            return context.db.Habilidade
                .findById(id, {
                attributes: context.requestedFields.getFields(info, { keep: ['id'], exclude: ['player'] })
            })
                .then((habilidade) => {
                utils_1.throwError(!habilidade, `Habilidade com id ${id} não encontrado!`);
                return habilidade;
            }).catch(utils_1.handleError);
        }
    },
    Mutation: {
        createHabilidade: composable_resolver_1.compose(...auth_resolver_1.authResolvers)((parent, { input }, { db, authUser }, info) => {
            input.player = authUser.player;
            return db.sequelize.transaction((t) => {
                return db.Habilidade
                    .create(input, { transaction: t });
            }).catch(utils_1.handleError);
        }),
        updateHabilidade: composable_resolver_1.compose(...auth_resolver_1.authResolvers)((parent, { id, input }, { db, authUser }, info) => {
            // id = parseInt(id);
            return db.sequelize.transaction((t) => {
                return db.Habilidade
                    .findById(id)
                    .then((habilidade) => {
                    utils_1.throwError(!habilidade, `Habilidade com id ${id} não encontrado!`);
                    return habilidade.update(input, { transaction: t });
                });
            }).catch(utils_1.handleError);
        }),
        deleteHabilidade: composable_resolver_1.compose(...auth_resolver_1.authResolvers)((parent, { id }, { db, authUser }, info) => {
            // id = parseInt(id);
            return db.sequelize.transaction((t) => {
                return db.Habilidade
                    .findById(id)
                    .then((habilidade) => {
                    utils_1.throwError(!habilidade, `Habilidade com id ${id} não encontrado!`);
                    return habilidade.destroy({ transaction: t })
                        .then(habilidade => !!habilidade);
                });
            }).catch(utils_1.handleError);
        })
    }
};
