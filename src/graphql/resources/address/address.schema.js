export const addressTypes = `

    type Address {
        id: ID!
        createdAt: String!
        updatedAt: String
        city: String
        complement: String
        country: String
        neighborhood: String
        number: String
        user: User
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

export const addressQueries = `
    allAddresses(filter: Address): [ Address! ]!
    address(id: ID!): Address
`

export const addressMutations = `
    createAddress(input: AddressInput!): Address
    updateAddress(input: AddressInput!): Address
    deleteAddress: Boolean
`

