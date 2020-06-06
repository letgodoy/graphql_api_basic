
import { Address, AddressTC } from '../models/AddressModel';
import { authUser } from '../middlewares/extract-jwt.middleware'

const AddressQuery = {
  addressById: AddressTC.getResolver('findById'),
  addressOne: AddressTC.getResolver('findOne'),
  addressMany: AddressTC.getResolver('findMany'),
  addressCount: AddressTC.getResolver('count'),
  addressConnection: AddressTC.getResolver('connection'),
  addressPagination: AddressTC.getResolver('pagination'),
};

const AddressMutation = {
  ...authUser({
    addressCreateOne: AddressTC.getResolver('createOne'),
    addressUpdateById: AddressTC.getResolver('updateById').wrapResolve(next => rp => {
      rp.args.record.userId = rp.context.authUser.id
      return next(rp);
    }),
    addressUpdateOne: AddressTC.getResolver('updateOne').wrapResolve(next => rp => {
      rp.args.record.userId = rp.context.authUser.id
      return next(rp);
    }),
  })
};

export { AddressQuery, AddressMutation };

//BASE
// const AddressQuery = {
//   addressById: AddressTC.getResolver('findById'),
//   addressByIds: AddressTC.getResolver('findByIds'),
//   addressOne: AddressTC.getResolver('findOne'),
//   addressMany: AddressTC.getResolver('findMany'),
//   addressCount: AddressTC.getResolver('count'),
//   addressConnection: AddressTC.getResolver('connection'),
//   addressPagination: AddressTC.getResolver('pagination'),
// };
// const UserMutation = {
//   userCreateOne: UserTC.getResolver('createOne'),
//   recoverPassword: UserTC.getResolver('updateOne'),
//   userCreateMany: UserTC.getResolver('createMany'),
//   ...authUser({
//     userUpdateById: UserTC.getResolver('updateById'),
//     userUpdateOne: UserTC.getResolver('updateOne'),
//     userUpdateMany: UserTC.getResolver('updateMany'),
//     userUpdateByIdPassword: UserTC.getResolver('updateById'),
//     userRemoveById: UserTC.getResolver('removeById'),
//     userRemoveOne: UserTC.getResolver('removeOne'),
//     userRemoveMany: UserTC.getResolver('removeMany'),
//   })
// };