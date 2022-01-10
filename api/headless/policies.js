const gql = require('../../services/gql')
const gqlConstants = require('../../services/gql-constants')

module.exports = async (req, res) => {
    const key = req.headers['x-api-key']
    if (!key) {
        return res.status(400).send({error: 'Please send the header x-api-key'})
    }
    try {
        const response = await gql.client.request(gqlConstants.POLICY_FROM_KEY, {key})
        res.send({data: response.keys_by_pk.userByUser.policies})
    } catch(err) {
        res.status(500).send({error: 'server error', details: err})
    }
    
}