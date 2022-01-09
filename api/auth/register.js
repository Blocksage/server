const gql = require('../../services/gql')
const queries = require('../../services/gql-constants')

module.exports = async (req, res) => {
    let response
    
    if(!req.body.email || !req.body.password) {
        return res.status(400).send('both email and password are compulsary')
    }
    
    try {
        response = await gql.client.request(queries.CREATE_USER, {
            email: req.body.email,
            password: req.body.password
        })    
        return res.send({
            id: response.insert_user_one.id
        })
    } catch(err) {
        console.error(err)
        res.status(400).send({error: 'Email already exists'})
    }
}