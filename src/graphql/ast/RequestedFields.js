const graphqlFields = require('graphql-fields')
const { difference, union } = require('lodash')

class RequestedFields {
  getFields(info, options) {
    let fields = Object.keys(graphqlFields(info))

    if (!options) {
      return fields
    }

    fields = options.keep ? union(fields, options.keep) : fields

    return options.exclude ? difference(fields, options.exclude) : fields
  }
}
// exports.RequestedFields = RequestedFields
module.exports = RequestedFields
