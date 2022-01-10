const gql = require('../../services/gql')
const gqlConstants = require('../../services/gql-constants')
var jwt = require('jsonwebtoken');


module.exports = async (req, res) => {
    let response
    
    if(!req.body.email || !req.body.password) {
        return res.status(400).send({error: 'both email and password are compulsary'})
    }
    
    try {
        response = await gql.client.request(gqlConstants.SEARCH_USER, {
            email: req.body.email,
            password: req.body.password
        })
        if(Array.isArray(response.user) && response.user.length > 0) {
            const jwtObject = {
                "sub": req.body.email,
                "firstName": response.user[0].firstName,
                // "iat": (new Date()).getTime(),
                "https://hasura.io/jwt/claims": {
                    "x-hasura-allowed-roles": ["user"],
                    "x-hasura-default-role": "user",
                    "x-hasura-user-id": "1234567890",
                }
            }
            const token = jwt.sign(jwtObject, process.env.BLOCKSAGE_JWT_SECRET, {algorithm:'HS256'});
            res.send({token})
        } else {
            console.error('No user found')
            res.status(401).send({error: 'No user found with given credentials'})
        }
    } catch (err) {
        console.error(err)
        throw new Error('Failed to log in')
    }
}