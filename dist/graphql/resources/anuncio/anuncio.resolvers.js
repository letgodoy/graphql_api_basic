"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils/utils");
const composable_resolver_1 = require("../../composable/composable.resolver");
const auth_resolver_1 = require("../../composable/auth.resolver");
exports.anuncioResolvers = {
    Anuncio: {
        player: (anuncio, args, { db, dataloaders: { playerLoader } }, info) => {
            return playerLoader
                .load({ key: anuncio.get('player'), info })
                .catch(utils_1.handleError);
        },
        proposes: (anuncio, args, { db, dataloaders: { proposeLoader } }, info) => {
            return proposeLoader
                .load({ key: anuncio.get('proposes'), info })
                .catch(utils_1.handleError);
        },
        skills: (anuncio, args, { db, dataloaders: { skillsLoader } }, info) => {
            return skillsLoader
                .load({ key: anuncio.get('skills'), info })
                .catch(utils_1.handleError);
        }
    },
    Query: {
        allAnuncioes: (parent, { first = 50, offset = 0 }, context, info) => {
            return context.db.Anuncio
                .findAll({
                limit: first,
                offset: offset,
                attributes: context.requestedFields.getFields(info, { keep: ['id'], exclude: ['anuncios'] })
            }).catch(utils_1.handleError);
        },
        anuncio: (parent, { id }, context, info) => {
            id = parseInt(id);
            return context.db.Anuncio
                .findById(id, {
                attributes: context.requestedFields.getFields(info, { keep: ['id'], exclude: ['anuncios'] })
            })
                .then((anuncio) => {
                utils_1.throwError(!anuncio, `Anuncio com id ${id} não encontrado!`);
                return anuncio;
            }).catch(utils_1.handleError);
        }
    },
    Mutation: {
        createAnuncio: composable_resolver_1.compose(...auth_resolver_1.authResolvers)((parent, { input }, { db, authUser }, info) => {
            input.player = authUser.player;
            return db.sequelize.transaction((t) => {
                return db.Anuncio
                    .create(input, { transaction: t });
            }).catch(utils_1.handleError);
        }),
        updateAnuncio: composable_resolver_1.compose(...auth_resolver_1.authResolvers)((parent, { id, input }, { db, authUser }, info) => {
            // id = parseInt(id);
            return db.sequelize.transaction((t) => {
                return db.Anuncio
                    .findById(id)
                    .then((Anuncio) => {
                    utils_1.throwError(!Anuncio, `Anuncio com id ${id} não encontrado!`);
                    utils_1.throwError(Anuncio.get('player') != authUser.player, `Não autorizado! Você só pode alterar seus proprios anuncios!`);
                    input.player = authUser.player;
                    return Anuncio.update(input, { transaction: t });
                });
            }).catch(utils_1.handleError);
        }),
        deleteAnuncio: composable_resolver_1.compose(...auth_resolver_1.authResolvers)((parent, { id }, { db, authUser }, info) => {
            // id = parseInt(id);
            return db.sequelize.transaction((t) => {
                return db.Anuncio
                    .findById(id)
                    .then((anuncio) => {
                    utils_1.throwError(!anuncio, `Anuncio com id ${id} não encontrado!`);
                    utils_1.throwError(anuncio.get('player') != authUser.player, `Não autorizado! Você só pode alterar seus proprios anuncios!`);
                    return anuncio.destroy({ transaction: t })
                        .then(anuncio => !!anuncio);
                });
            }).catch(utils_1.handleError);
        })
    }
};
