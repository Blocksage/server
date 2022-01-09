const graphqlRequest = require('graphql-request')
const config = require('../environment/environment')
client = new graphqlRequest.GraphQLClient(config.endpoint, { headers: {
    'x-hasura-admin-secret': config.adminSecret
}})

module.exports = {
    client
}
