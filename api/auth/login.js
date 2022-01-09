const gql = require('../../services/gql')
const gqlConstants = require('../../services/gql-constants')


module.exports = async (req, res) => {
    console.log(gqlConstants)
    
    const response = await gql.client.request(gqlConstants.SEARCH_USER, {
                                                email: 'ipians.aman@gmail.com',
                                                password: 'amangautam'
                                            }).catch(err => {console.error(err)})
    res.send(response)
}