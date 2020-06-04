
import { User, UserTC } from '../models/UserModel';

const UserQuery = {
    userById: UserTC.getResolver('findById').wrapResolve(next => rp => {
        if (rp.projection.password) delete rp.projection.password
        return next(rp);
      }),
    // userByIds: UserTC.getResolver('findByIds'),
    userOne: UserTC.getResolver('findOne').wrapResolve(next => rp => {
        if (rp.projection.password) delete rp.projection.password
        return next(rp);
      }),
    userMany: UserTC.getResolver('findMany').wrapResolve(next => rp => {
        if (rp.projection.password) delete rp.projection.password
        return next(rp);
      }),
        userCount: UserTC.getResolver('count'),
        userConnection: UserTC.getResolver('connection'),
        userPagination: UserTC.getResolver('pagination'),
};

const UserMutation = {
    userCreateOne: UserTC.getResolver('createOne'),
    // userCreateMany: UserTC.getResolver('createMany'),
    userUpdateById: UserTC.getResolver('updateById').wrapResolve(next => rp => {
        if (rp.args.record.password) throw new Error("Não é permitido alterar a senha")
        if (rp.projection.record.password) delete rp.projection.record.password
        return next(rp);
      }),
    userUpdateOne: UserTC.getResolver('updateOne').wrapResolve(next => rp => {
        if (rp.args.record.password) throw new Error("Não é permitido alterar a senha")
        if (rp.projection.record.password) delete rp.projection.record.password
        return next(rp);
      }),
    userUpdateMany: UserTC.getResolver('updateMany').wrapResolve(next => rp => {
        if (rp.args.record.password) throw new Error("Não é permitido alterar a senha")
        if (rp.projection.record.password) delete rp.projection.record.password
        return next(rp);
      }),
    userUpdateByIdPassword: UserTC.getResolver('updateById'),
    // userRemoveById: UserTC.getResolver('removeById'),
    // userRemoveOne: UserTC.getResolver('removeOne'),
    // userRemoveMany: UserTC.getResolver('removeMany'),
};

export { UserQuery, UserMutation };