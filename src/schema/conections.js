import { UserTC } from "../models/UserModel";
import { AddressTC, Address } from "../models/AddressModel";

export default addfields = {
    UserTC.addFields({
    address: {
      type: AddressTC, // array of Posts
      resolve: (user, args, context, info) => {
        return Address.findOne({ userId: user.id });
      },
    },
  }),
}
