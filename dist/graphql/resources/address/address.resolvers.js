"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils/utils");
const composable_resolver_1 = require("../../composable/composable.resolver");
const auth_resolver_1 = require("../../composable/auth.resolver");
exports.addressResolvers = {
    Address: {
        player: (address, args, { db, dataloaders: { playerLoader } }, info) => {
            return playerLoader
                .load({ key: address.get('player'), info })
                .catch(utils_1.handleError);
        }
    },
    Query: {
        allAddresses: (parent, { first = 50, offset = 0 }, context, info) => {
            return context.db.Address
                .findAll({
                limit: first,
                offset: offset,
                attributes: context.requestedFields.getFields(info, { keep: ['id'], exclude: ['player'] })
            }).catch(utils_1.handleError);
        },
        address: (parent, { id }, context, info) => {
            id = parseInt(id);
            return context.db.Address
                .findById(id, {
                attributes: context.requestedFields.getFields(info, { keep: ['id'], exclude: ['player'] })
            })
                .then((address) => {
                utils_1.throwError(!address, `Endereço com id ${id} não encontrado!`);
                return address;
            }).catch(utils_1.handleError);
        }
    },
    Mutation: {
        createAddress: composable_resolver_1.compose(...auth_resolver_1.authResolvers)((parent, { input }, { db, authUser }, info) => {
            input.player = authUser.player;
            return db.sequelize.transaction((t) => {
                return db.Address
                    .create(input, { transaction: t });
            }).catch(utils_1.handleError);
        }),
        updateAddress: composable_resolver_1.compose(...auth_resolver_1.authResolvers)((parent, { id, input }, { db, authUser }, info) => {
            id = parseInt(id);
            return db.sequelize.transaction((t) => {
                return db.Address
                    .findById(id)
                    .then((address) => {
                    utils_1.throwError(!address, `Endereço com id ${id} não encontrado!`);
                    utils_1.throwError(address.get('player') != authUser.player, `Não autorizado! Você só pode editar seu proprio endereço!`);
                    input.player = authUser.player;
                    return address.update(input, { transaction: t });
                });
            }).catch(utils_1.handleError);
        }),
        deleteAddress: composable_resolver_1.compose(...auth_resolver_1.authResolvers)((parent, { id }, { db, authUser }, info) => {
            id = parseInt(id);
            return db.sequelize.transaction((t) => {
                return db.Address
                    .findById(id)
                    .then((address) => {
                    utils_1.throwError(!address, `Endereço com id ${id} não encontrado!`);
                    utils_1.throwError(address.get('player') != authUser.player, `Não autorizado! Você só pode deletar seu proprio endereço!`);
                    return address.destroy({ transaction: t })
                        .then(address => !!address);
                });
            }).catch(utils_1.handleError);
        })
    }
};
