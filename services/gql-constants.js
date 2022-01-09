module.exports = {
  LOGIN: `mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
  `,
  
  CREATE_USER: `mutation Login($email: String!, $password: String!) {
    insert_user_one(object: {email: $email, password: $password}) {
      id
      email
    }
  }`
}