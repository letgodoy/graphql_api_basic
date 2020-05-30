const addressTypes = `

    type Address {
        id: ID!
        createdAt: String!
        updatedAt: String
        city: String
        complement: String
        country: String
        neighborhood: String
        number: String
        player: Player
        state: String
        street: String
        zipcode: String!
    }

    input AddressInput {
        city: String
        complement: String
        country: String
        neighborhood: String
        number: String
        state: String
        street: String
        zipcode: String!
    }

`

const addressQueries = `
    allAddresses(first: Int, offset: Int): [ Address! ]!
    address(id: ID!): Address
`

const addressMutations = `
    createAddress(input: AddressInput!): Address
    updateAddress(id: ID!, input: AddressInput!): Address
    deleteAddress(id: ID!): Boolean
`

module.exports = { addressTypes, addressQueries, addressMutations }
