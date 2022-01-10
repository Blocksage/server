module.exports = {
  LOGIN: `mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }`,

  SEARCH_USER: `query SEARCH($email: String!, $password: String!) {
    user(where: {_and: {email: {_eq: $email}, password: {_eq: $password}}}) {
      email
      firstName
      id
    }
  }`,
  
  CREATE_USER: `mutation Register($email: String!, $password: String!, $firstName:String, $lastName:String) {
    insert_user_one(object: {email: $email, password: $password, firstName:$firstName, lastName:$lastName}) {
      id
      email
    }
  }`
}