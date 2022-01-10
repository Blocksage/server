const gql = require('../../services/gql')
const queries = require('../../services/gql-constants')
const jwt = require('jsonwebtoken')
module.exports = async (req, res) => {
    let response
    
    if(!req.body.email || !req.body.password || !req.body.firstName || !req.body.lastName) {
        return res.status(400).send({
            error: 'all registration fields are compulsary'
        })
    }
    
    try {
        response = await gql.client.request(queries.CREATE_USER, {
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        })
        const jwtObject = {
            "sub": req.body.email,
            "firstName": req.body.firstName,
            // "iat": (new Date()).getTime(),
            "https://hasura.io/jwt/claims": {
                "x-hasura-allowed-roles": ["user"],
                "x-hasura-default-role": "user",
                "x-hasura-user-id": response.insert_user_one.id,
            }
        }

        const token = jwt.sign(jwtObject, process.env.BLOCKSAGE_JWT_SECRET, {algorithm:'HS256'})
    
        return res.send({
            // id: response.insert_user_one.id,
            token
        })
    } catch(err) {
    console.error(err)
    res.status(400).send({error: 'Email already exists'})
    }
}