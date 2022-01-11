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
  }`,

  POLICY_FROM_KEY: `query PoliciesFromKey($key:uuid!) {
    keys_by_pk(id: $key) {
      id
      userByUser {
        policies {
          title
          checklist
          createdAt
          id
          details
          slug
        }
      }
    }
  }`,

  POLICY_FROM_KEY_WITH_SLUG: `query PoliciesFromKeyWithSlug($key: uuid!, $slug:String) {
    keys_by_pk(id: $key) {
      id
      user
      userByUser {
        policies(where: {slug: {_eq: $slug}}) {
          title
          checklist
          createdAt
          id
          details
          slug
        }
      }
    }
  }`,

  INSERT_TASK: `mutation InsertTask($batch:bigint,$task:jsonb,$user:uuid!,$webhook:String) {
    insert_task_one(object: {batch: $batch, task: $task, user: $user, webhook: $webhook}) {
      id
    }
  }`,

  GET_PENDING_TASKS: `query PendingTasks {
    task(where: {status: {_eq: "pending"}}) {
      batch
      user
      id
      webhook
    }
  }`,

  UPDATE_TASK_RESULT: `mutation UpdateTaskResult($task: uuid!) {
    update_task_by_pk(pk_columns: {id: $task}, _set: {status: "complete"}) {
      id
    }
  }
  `
}