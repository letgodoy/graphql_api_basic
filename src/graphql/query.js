import { userQueries } from './resources/user/user.schema'
import { addressQueries } from './resources/address/address.schema'

module.exports = `
    type Query {
        ${userQueries}
        ${addressQueries}
        
    }
`