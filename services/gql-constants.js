module.exports = {
    SEARCH_USER: `query FindUser($email:String, $password:String) {
        user(where: {_and: {email: {_eq: $email}, password: {_eq: $password}}}) {
          id
          email
        }
      }`
}