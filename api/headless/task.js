const gql = require('../../services/gql')
const gqlConstants = require('../../services/gql-constants')
const bsc = require('../../services/bsc')

module.exports = async (req, res) => {
    const campaign = await bsc.publish()
    res.send('done')
    return
    const key = req.headers['x-api-key']
    if (!key) {
        return res.status(400).send({error: 'Please send the header x-api-key'})
    }

    const body = req.body 

    if(!body.policy) {
        return res.status(400).send({error: 'Please send the policy slug'})
    }
    
    // Find the policy details
    const response = await gql.client.request(gqlConstants.POLICY_FROM_KEY_WITH_SLUG, {
        key,
        slug: req.body.policy
    })
    res.send(response)
}