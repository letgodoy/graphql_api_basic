import { GraphQLResolveInfo } from "graphql";
import { Transaction } from "sequelize";

import { DbConnection } from "../../../interfaces/DbConnectionInterface"
import { handleError, throwError } from "../../../utils/utils";
import { compose } from "../../composable/composable.resolver";
import { authResolvers } from "../../composable/auth.resolver";
import { AuthUser } from "../../../interfaces/AuthUserInterface";
import { DataLoaders } from "../../../interfaces/DataLoadersInterface";
import { ResolverContext } from "../../../interfaces/ResolverContextInterface";
import { AnuncioInstance } from "../../../models/AnuncioModel";

export const anuncioResolvers = {

    Anuncio: {

        player: (anuncio, args, {db, dataloaders: {playerLoader}}: {db: DbConnection, dataloaders: DataLoaders}, info: GraphQLResolveInfo) => {
            return playerLoader
                .load({key: anuncio.get('player'), info})
                .catch(handleError);
        },

        proposes: (anuncio, args, {db, dataloaders: {proposeLoader}}: {db: DbConnection, dataloaders: DataLoaders}, info: GraphQLResolveInfo) => {
            return proposeLoader
                .load({key: anuncio.get('proposes'), info})
                .catch(handleError);
        },

        skills: (anuncio, args, {db, dataloaders: {skillsLoader}}: {db: DbConnection, dataloaders: DataLoaders}, info: GraphQLResolveInfo) => {
            return skillsLoader
                .load({key: anuncio.get('skills'), info})
                .catch(handleError);
        },

        files: (anuncio, args, {db, dataloaders: {fileLoader}}: {db: DbConnection, dataloaders: DataLoaders}, info: GraphQLResolveInfo) => {
            return fileLoader
                .load({key: anuncio.get('files'), info})
                .catch(handleError);
        }

    },

    Query: {

        allAnuncioes: (parent, { first = 50, offset = 0 }, context: ResolverContext, info: GraphQLResolveInfo) => {
            return context.db.Anuncio
                .findAll({
                    limit: first,
                    offset: offset,
                    attributes: context.requestedFields.getFields(info, {keep: ['id'], exclude: ['anuncios']})
                }).catch(handleError);
        },

        anuncio: (parent, { id }, context: ResolverContext, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return context.db.Anuncio
                .findById(id, {
                    attributes: context.requestedFields.getFields(info, {keep: ['id'], exclude: ['anuncios']})
                })
                .then((anuncio: AnuncioInstance) => {
                    throwError(!anuncio, `Anuncio com id ${id} não encontrado!`);
                    return anuncio;
                }).catch(handleError);
        }

    },

    Mutation: {

        createAnuncio: compose(...authResolvers)((parent, {input}, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            input.player = authUser.player;
            return db.sequelize.transaction((t: Transaction) => {
                return db.Anuncio
                    .create(input, {transaction: t});
            }).catch(handleError);
        }),

        updateAnuncio: compose(...authResolvers)((parent, {id, input}, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            // id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Anuncio
                    .findById(id)
                    .then((Anuncio: AnuncioInstance) => {
                        throwError(!Anuncio, `Anuncio com id ${id} não encontrado!`);
                        throwError(Anuncio.get('player') != authUser.player, `Não autorizado! Você só pode alterar seus proprios anuncios!`);
                        input.player = authUser.player;
                        return Anuncio.update(input, {transaction: t});
                    });
            }).catch(handleError);
        }),

        deleteAnuncio: compose(...authResolvers)((parent, {id}, {db, authUser}: {db: DbConnection, authUser: AuthUser}, info: GraphQLResolveInfo) => {
            // id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Anuncio
                    .findById(id)
                    .then((anuncio: AnuncioInstance) => {
                        throwError(!anuncio, `Anuncio com id ${id} não encontrado!`);
                        throwError(anuncio.get('player') != authUser.player, `Não autorizado! Você só pode alterar seus proprios anuncios!`);
                        return anuncio.destroy({transaction: t})
                            .then(anuncio => !!anuncio);
                    });
            }).catch(handleError);
        })

    }

};