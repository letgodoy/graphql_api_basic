import { GraphQLResolveInfo } from "graphql";
import { Transaction } from "sequelize";

import { DbConnection } from "../../../interfaces/DbConnectionInterface"
import { handleError, throwError } from "../../../utils/utils";
import { compose } from "../../composable/composable.resolver";
import { authResolvers } from "../../composable/auth.resolver";
import { AuthUser } from "../../../interfaces/AuthUserInterface";
import { ResolverContext } from "../../../interfaces/ResolverContextInterface";
import { FileInstance } from "../../../models/FileModel";

export const fileResolvers = {

    Query: {

        allFiles: (parent, { first = 50, offset = 0 }, context: ResolverContext, info: GraphQLResolveInfo) => {
            return context.db.File
                .findAll({
                    limit: first,
                    offset: offset,
                    attributes: context.requestedFields.getFields(info, {keep: ['id']})
                }).catch(handleError);
        },

        file: (parent, { id }, context: ResolverContext, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return context.db.File
                .findById(id, {
                    attributes: context.requestedFields.getFields(info, {keep: ['id']})
                })
                .then((file: FileInstance) => {
                    throwError(!file, `Perfil com id ${id} não encontrado!`);
                    return file;
                }).catch(handleError);
        }

    },

    Mutation: {

        createFile: compose(...authResolvers)((parent, {input}, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            input.user = authUser.id;
            return db.sequelize.transaction((t: Transaction) => {
                return db.File
                    .create(input, {transaction: t});
            }).catch(handleError);
        }),

        updateFile: compose(...authResolvers)((parent, {id, input}, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            // id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.File
                    .findById(authUser.player)
                    .then((file: FileInstance) => {
                        throwError(!file, `File com id ${authUser.player} não encontrado!`);
                        throwError(file.get('user') != authUser.id, `Não autorizado! Você só pode alterar seus proprios Perfil!`);
                        return file.update(input, {transaction: t});
                    });
            }).catch(handleError);
        }),

        deleteFile: compose(...authResolvers)((parent, args, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            // id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.File
                    .findById(authUser.player)
                    .then((file: FileInstance) => {
                        throwError(!file, `Perfil com id ${authUser.player} não encontrado!`);
                        throwError(file.get('user') != authUser.id, `Não autorizado! Você só pode alterar seus proprios Perfil!`);
                        return file.destroy({transaction: t})
                            .then(file => !!file);
                    });
            }).catch(handleError);
        })

    }

};