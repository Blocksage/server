const gql = require('../../services/gql')
const gqlConstants = require('../../services/gql-constants')
var jwt = require('jsonwebtoken');


module.exports = async (req, res) => {
    let response
    
    if(!req.body.email || !req.body.password) {
        return res.status(400).send('both email and password are compulsary')
    }
    
    try {
        response = await gql.client.request(gqlConstants.SEARCH_USER, {
            email: req.body.email,
            password: req.body.password
        })
    } catch (err) {
        console.error(err)
        throw new Error('Failed to log in')
    }
    
    if(response && Array.isArray(response.user)) {
        if(response.user.length > 0) {
            // generate jwt
            const jwtObject = {
                "sub": req.body.email,
                // "iat": (new Date()).getTime(),
                "https://hasura.io/jwt/claims": {
                "x-hasura-allowed-roles": ["user"],
                "x-hasura-default-role": "user",
                "x-hasura-user-id": "1234567890",
            }
        }
        const token = jwt.sign(jwtObject, process.env.BLOCKSAGE_JWT_SECRET, {algorithm:'HS256'});
        res.send(token)
    } else {
        console.error('No user found')
        res.status(401).send('No user found with given credentials')
    }
    
}else {
    throw new Error('Could not find email/password combination')
}
}