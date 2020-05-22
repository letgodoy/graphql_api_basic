"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils/utils");
const composable_resolver_1 = require("../../composable/composable.resolver");
const auth_resolver_1 = require("../../composable/auth.resolver");
exports.proposeResolvers = {
    Propose: {
        anuncio: (propose, args, { db, dataloaders: { anuncioLoader } }, info) => {
            return anuncioLoader
                .load({ key: propose.get('anuncios'), info })
                .catch(utils_1.handleError);
        },
        from: (propose, args, { db, dataloaders: { playerLoader } }, info) => {
            return playerLoader
                .load({ key: propose.get('from'), info })
                .catch(utils_1.handleError);
        },
        to: (propose, args, { db, dataloaders: { playerLoader } }, info) => {
            return playerLoader
                .load({ key: propose.get('to'), info })
                .catch(utils_1.handleError);
        },
    },
    Query: {
        allProposes: (parent, { first = 50, offset = 0 }, context, info) => {
            return context.db.Propose
                .findAll({
                limit: first,
                offset: offset,
                attributes: context.requestedFields.getFields(info, { keep: ['id'], exclude: ['Proposes'] })
            }).catch(utils_1.handleError);
        },
        propose: (parent, { id }, context, info) => {
            id = parseInt(id);
            return context.db.Propose
                .findById(id, {
                attributes: context.requestedFields.getFields(info, { keep: ['id'], exclude: ['Players'] })
            })
                .then((propose) => {
                utils_1.throwError(!propose, `Perfil com id ${id} não encontrado!`);
                return propose;
            }).catch(utils_1.handleError);
        }
    },
    Mutation: {
        createPropose: composable_resolver_1.compose(...auth_resolver_1.authResolvers)((parent, { input }, { db, authUser }, info) => {
            input.user = authUser.id;
            return db.sequelize.transaction((t) => {
                return db.Propose
                    .create(input, { transaction: t });
            }).catch(utils_1.handleError);
        }),
        updatePropose: composable_resolver_1.compose(...auth_resolver_1.authResolvers)((parent, { id, input }, { db, authUser }, info) => {
            // id = parseInt(id);
            return db.sequelize.transaction((t) => {
                return db.Propose
                    .findById(id)
                    .then((propose) => {
                    utils_1.throwError(!propose, `Proposta com id ${id} não encontrado!`);
                    utils_1.throwError((propose.get('from') != authUser.player || propose.get('to') != authUser.player), `Não autorizado! Você só pode alterar suas propostas!`);
                    return propose.update(input, { transaction: t });
                });
            }).catch(utils_1.handleError);
        }),
        deletePropose: composable_resolver_1.compose(...auth_resolver_1.authResolvers)((parent, { id }, { db, authUser }, info) => {
            // id = parseInt(id);
            return db.sequelize.transaction((t) => {
                return db.Propose
                    .findById(id)
                    .then((propose) => {
                    utils_1.throwError(!propose, `Proposta com id ${id} não encontrado!`);
                    utils_1.throwError((propose.get('from') != authUser.player || propose.get('to') != authUser.player), `Não autorizado! Você só pode alterar suas propostas!`);
                    return propose.destroy({ transaction: t })
                        .then(propose => !!propose);
                });
            }).catch(utils_1.handleError);
        })
    }
};
