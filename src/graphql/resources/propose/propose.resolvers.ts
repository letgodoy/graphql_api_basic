import { GraphQLResolveInfo } from "graphql";
import { Transaction } from "sequelize";

import { DbConnection } from "../../../interfaces/DbConnectionInterface"
import { handleError, throwError } from "../../../utils/utils";
import { compose } from "../../composable/composable.resolver";
import { authResolvers } from "../../composable/auth.resolver";
import { AuthUser } from "../../../interfaces/AuthUserInterface";
import { DataLoaders } from "../../../interfaces/DataLoadersInterface";
import { ResolverContext } from "../../../interfaces/ResolverContextInterface";
import { ProposeInstance } from "../../../models/ProposeModel";

export const proposeResolvers = {

    Propose: {

        anuncio: (propose, args, {db, dataloaders: {anuncioLoader}}: {db: DbConnection, dataloaders: DataLoaders}, info: GraphQLResolveInfo) => {
            return anuncioLoader
                .load({key: propose.get('anuncios'), info})
                .catch(handleError);
        },

        from: (propose, args, {db, dataloaders: {playerLoader}}: {db: DbConnection, dataloaders: DataLoaders}, info: GraphQLResolveInfo) => {
            return playerLoader
                .load({key: propose.get('from'), info})
                .catch(handleError);
        },

        to: (propose, args, {db, dataloaders: {playerLoader}}: {db: DbConnection, dataloaders: DataLoaders}, info: GraphQLResolveInfo) => {
            return playerLoader
                .load({key: propose.get('to'), info})
                .catch(handleError);
        },

    },

    Query: {

        allProposes: (parent, { first = 50, offset = 0 }, context: ResolverContext, info: GraphQLResolveInfo) => {
            return context.db.Propose
                .findAll({
                    limit: first,
                    offset: offset,
                    attributes: context.requestedFields.getFields(info, {keep: ['id'], exclude: ['Proposes']})
                }).catch(handleError);
        },

        propose: (parent, { id }, context: ResolverContext, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return context.db.Propose
                .findById(id, {
                    attributes: context.requestedFields.getFields(info, {keep: ['id'], exclude: ['Players']})
                })
                .then((propose: ProposeInstance) => {
                    throwError(!propose, `Perfil com id ${id} não encontrado!`);
                    return propose;
                }).catch(handleError);
        }

    },

    Mutation: {

        createPropose: compose(...authResolvers)((parent, {input}, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            input.from = authUser.player;
            return db.sequelize.transaction((t: Transaction) => {
                return db.Propose
                    .create(input, {transaction: t});
            }).catch(handleError);
        }),

        updatePropose: compose(...authResolvers)((parent, {id, input}, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            // id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Propose
                    .findById(id)
                    .then((propose: ProposeInstance) => {
                        throwError(!propose, `Proposta com id ${id} não encontrado!`);
                        throwError((propose.get('from') != authUser.player || propose.get('to') != authUser.player), `Não autorizado! Você só pode alterar suas propostas!`);
                        return propose.update(input, {transaction: t});
                    });
            }).catch(handleError);
        }),

        deletePropose: compose(...authResolvers)((parent, { id }, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            // id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Propose
                    .findById(id)
                    .then((propose: ProposeInstance) => {
                        throwError(!propose, `Proposta com id ${id} não encontrado!`);
                        throwError((propose.get('from') != authUser.player || propose.get('to') != authUser.player), `Não autorizado! Você só pode alterar suas propostas!`);
                        return propose.destroy({transaction: t})
                            .then(propose => !!propose);
                    });
            }).catch(handleError);
        })

    }

};