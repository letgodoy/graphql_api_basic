const DataLoader = require('dataloader')

module.exports = class DataLoaderFactory {
  constructor(db, requestedFields) {
    this.db = db
    this.requestedFields = requestedFields
  }
  getLoaders() {
    return {
      userLoader: new DataLoader(
        (params) =>
          UserLoader.batchUsers(this.db.User, params, this.requestedFields),
        { cacheKeyFn: (param) => param.key }
      ),
      postLoader: new DataLoader(
        (params) =>
          PostLoader.batchPosts(this.db.Post, params, this.requestedFields),
        { cacheKeyFn: (param) => param.key }
      ),
      playerLoader: new DataLoader(
        (params) =>
          PlayerLoader.batchPlayers(
            this.db.Player,
            params,
            this.requestedFields
          ),
        { cacheKeyFn: (param) => param.key }
      ),
      skillsLoader: new DataLoader(
        (params) =>
          SkillsLoader.batchSkillss(
            this.db.Skills,
            params,
            this.requestedFields
          ),
        { cacheKeyFn: (param) => param.key }
      ),
      proposeLoader: new DataLoader(
        (params) =>
          ProposeLoader.batchProposes(
            this.db.Propose,
            params,
            this.requestedFields
          ),
        { cacheKeyFn: (param) => param.key }
      ),
      addressLoader: new DataLoader(
        (params) =>
          AddressLoader.batchAddresss(
            this.db.Address,
            params,
            this.requestedFields
          ),
        { cacheKeyFn: (param) => param.key }
      ),
      chatLoader: new DataLoader(
        (params) =>
          ChatLoader.batchChats(this.db.Chat, params, this.requestedFields),
        { cacheKeyFn: (param) => param.key }
      ),
      commentLoader: new DataLoader(
        (params) =>
          CommentLoader.batchComments(
            this.db.Comment,
            params,
            this.requestedFields
          ),
        { cacheKeyFn: (param) => param.key }
      ),
      notificationLoader: new DataLoader(
        (params) =>
          NotificationLoader.batchNotifications(
            this.db.Notification,
            params,
            this.requestedFields
          ),
        { cacheKeyFn: (param) => param.key }
      ),
      rankLoader: new DataLoader(
        (params) =>
          RankLoader.batchRanks(this.db.Rank, params, this.requestedFields),
        { cacheKeyFn: (param) => param.key }
      ),
      anuncioLoader: new DataLoader(
        (params) =>
          AnuncioLoader.batchAnuncios(
            this.db.Anuncio,
            params,
            this.requestedFields
          ),
        { cacheKeyFn: (param) => param.key }
      ),
      categoryLoader: new DataLoader(
        (params) =>
          CategoryLoader.batchCategorys(
            this.db.Category,
            params,
            this.requestedFields
          ),
        { cacheKeyFn: (param) => param.key }
      ),
      fileLoader: new DataLoader(
        (params) =>
          FileLoader.batchFiles(this.db.File, params, this.requestedFields),
        { cacheKeyFn: (param) => param.key }
      ),
    }
  }
}

class AddressLoader {
  static batchAddresss(Address, params, requestedFields) {
    let ids = params.map((param) => param.key)
    return Promise.resolve(
      Address.findAll({
        where: { id: { $in: ids } },
        attributes: requestedFields.getFields(params[0].info, {
          keep: ['id'],
          exclude: ['player'],
        }),
      })
    )
  }
}

class AnuncioLoader {
  static batchAnuncios(Anuncio, params, requestedFields) {
    let ids = params.map((param) => param.key)
    return Promise.resolve(
      Anuncio.findAll({
        where: { id: { $in: ids } },
        attributes: requestedFields.getFields(params[0].info, {
          keep: ['id'],
          exclude: ['player', 'proposes', 'skills'],
        }),
      })
    )
  }
}

class CategoryLoader {
  static batchCategorys(Category, params, requestedFields) {
    let ids = params.map((param) => param.key)
    return Promise.resolve(
      Category.findAll({
        where: { id: { $in: ids } },
        attributes: requestedFields.getFields(params[0].info, {
          keep: ['id'],
          exclude: ['user', 'skills'],
        }),
      })
    )
  }
}

class ChatLoader {
  static batchChats(Chat, params, requestedFields) {
    let ids = params.map((param) => param.key)
    return Promise.resolve(
      Chat.findAll({
        where: { id: { $in: ids } },
        attributes: requestedFields.getFields(params[0].info, {
          keep: ['id'],
          exclude: ['to', 'propose', 'from'],
        }),
      })
    )
  }
}

class CommentLoader {
  static batchComments(Comment, params, requestedFields) {
    let ids = params.map((param) => param.key)
    return Promise.resolve(
      Comment.findAll({
        where: { id: { $in: ids } },
        attributes: requestedFields.getFields(params[0].info, {
          keep: ['id'],
          exclude: ['to', 'propose', 'from'],
        }),
      })
    )
  }
}

class FileLoader {
  static batchFiles(File, params, requestedFields) {
    let ids = params.map((param) => param.key)
    return Promise.resolve(
      File.findAll({
        where: { id: { $in: ids } },
        attributes: requestedFields.getFields(params[0].info, { keep: ['id'] }),
      })
    )
  }
}

class NotificationLoader {
  static batchNotifications(Notification, params, requestedFields) {
    let ids = params.map((param) => param.key)
    return Promise.resolve(
      Notification.findAll({
        where: { id: { $in: ids } },
        attributes: requestedFields.getFields(params[0].info, {
          keep: ['id'],
          exclude: ['player'],
        }),
      })
    )
  }
}

class PlayerLoader {
  static batchPlayers(Player, params, requestedFields) {
    let ids = params.map((param) => param.key)
    return Promise.resolve(
      Player.findAll({
        where: { id: { $in: ids } },
        attributes: requestedFields.getFields(params[0].info, {
          keep: ['id'],
          exclude: [
            'address',
            'chatsFrom',
            'chatsTo',
            'commentsTo',
            'commentsfrom',
            'notifications',
            'proposes',
            'proposesFrom',
            'ranks',
            'anuncioses',
            'ranksmaked',
          ],
        }),
      })
    )
  }
}

class PostLoader {
  static batchPosts(Post, params, requestedFields) {
    let ids = params.map((param) => param.key)
    return Promise.resolve(
      Post.findAll({
        where: { id: { $in: ids } },
        attributes: requestedFields.getFields(params[0].info, { keep: ['id'] }),
      })
    )
  }
}

class ProposeLoader {
  static batchProposes(Propose, params, requestedFields) {
    let ids = params.map((param) => param.key)
    return Promise.resolve(
      Propose.findAll({
        where: { id: { $in: ids } },
        attributes: requestedFields.getFields(params[0].info, {
          keep: ['id'],
          exclude: [
            'address',
            'chatsFrom',
            'chatsTo',
            'commentsTo',
            'commentsfrom',
            'notifications',
            'proposes',
            'proposesFrom',
            'ranks',
            'anuncioses',
            'ranksmaked',
          ],
        }),
      })
    )
  }
}

class RankLoader {
  static batchRanks(Rank, params, requestedFields) {
    let ids = params.map((param) => param.key)
    return Promise.resolve(
      Rank.findAll({
        where: { id: { $in: ids } },
        attributes: requestedFields.getFields(params[0].info, {
          keep: ['id'],
          exclude: ['player', 'propose', 'from'],
        }),
      })
    )
  }
}

class SkillsLoader {
  static batchSkillss(Skills, params, requestedFields) {
    let ids = params.map((param) => param.key)
    return Promise.resolve(
      Skills.findAll({
        where: { id: { $in: ids } },
        attributes: requestedFields.getFields(params[0].info, {
          keep: ['id'],
          exclude: ['user'],
        }),
      })
    )
  }
}

class UserLoader {
  static batchUsers(User, params, requestedFields) {
    let ids = params.map((param) => param.key)
    return Promise.resolve(
      User.findAll({
        where: { id: { $in: ids } },
        attributes: requestedFields.getFields(params[0].info, {
          keep: ['id'],
          exclude: ['player'],
        }),
      })
    )
  }
}
