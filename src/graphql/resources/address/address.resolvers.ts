import { GraphQLResolveInfo } from "graphql";
import { Transaction } from "sequelize";

import { DbConnection } from "../../../interfaces/DbConnectionInterface";
import { handleError, throwError } from "../../../utils/utils";
import { compose } from "../../composable/composable.resolver";
import { authResolvers } from "../../composable/auth.resolver";
import { AuthUser } from "../../../interfaces/AuthUserInterface";
import { DataLoaders } from "../../../interfaces/DataLoadersInterface";
import { ResolverContext } from "../../../interfaces/ResolverContextInterface";
import { AddressInstance } from "../../../models/AddressModel";

export const addressResolvers = {

    Address: {

        player: (address, args, {db, dataloaders: {playerLoader}}: {db: DbConnection, dataloaders: DataLoaders}, info: GraphQLResolveInfo) => {
            return playerLoader
                .load({key: address.get('player'), info})
                .catch(handleError);
        }

    },

    Query: {

        allAddresses: (parent, { first = 50, offset = 0 }, context: ResolverContext, info: GraphQLResolveInfo) => {
            return context.db.Address
                .findAll({
                    limit: first,
                    offset: offset,
                    attributes: context.requestedFields.getFields(info, {keep: ['id'], exclude: ['player']})
                }).catch(handleError);
        },

        address: (parent, { id }, context: ResolverContext, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return context.db.Address
                .findById(id, {
                    attributes: context.requestedFields.getFields(info, {keep: ['id'], exclude: ['player']})
                })
                .then((address: AddressInstance) => {
                    throwError(!address, `Endereço com id ${id} não encontrado!`);
                    return address;
                }).catch(handleError);
        }

    },

    Mutation: {

        createAddress: compose(...authResolvers)((parent, {input}, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            input.player = authUser.player;
            return db.sequelize.transaction((t: Transaction) => {
                return db.Address
                    .create(input, {transaction: t});
            }).catch(handleError);
        }),

        updateAddress: compose(...authResolvers)((parent, {id, input}, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Address
                    .findById(id)
                    .then((address: AddressInstance) => {
                        throwError(!address, `Endereço com id ${id} não encontrado!`);
                        throwError(address.get('player') != authUser.player, `Não autorizado! Você só pode editar seu proprio endereço!`);
                        input.player = authUser.player;
                        return address.update(input, {transaction: t});
                    });
            }).catch(handleError);
        }),

        deleteAddress: compose(...authResolvers)((parent, {id}, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Address
                    .findById(id)
                    .then((address: AddressInstance) => {
                        throwError(!address, `Endereço com id ${id} não encontrado!`);
                        throwError(address.get('player') != authUser.player, `Não autorizado! Você só pode deletar seu proprio endereço!`);
                        return address.destroy({transaction: t})
                            .then(address => !!address);
                    });
            }).catch(handleError);
        })

    }

};