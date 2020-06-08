import { tokenMutations } from './resources/token/token.schema'
import { userMutations } from './resources/user/user.schema'
import { addressMutations } from './resources/address/address.schema'

export default `
    type Mutation {
        ${tokenMutations}
        ${userMutations}
        ${addressMutations}
    }
`