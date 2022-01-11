const gql = require('../../services/gql')
const gqlConstants = require('../../services/gql-constants')
const bsc = require('../../services/bsc')
const axios = require('axios')

module.exports = async (req, res) => {
    // get a list of incomplete jobs...

    const pendingTaskResponse = await gql.client.request(gqlConstants.GET_PENDING_TASKS)
    console.log('pending tasks', pendingTaskResponse.task)
    pendingTaskResponse.task.forEach(async task => {
        const result = await bsc.getResults(task.batch)
        if(Array.isArray(result) && result.length > 0) {
            // Task is complete... 
            // Save it and send it through the webhook
            // console.log(result)
            await sendToWebHook(task.webhook, result)
            await updateResultInDB(task.id)
        }
    })
    res.send({message: 'ok'})
}


function sendToWebHook(webhook, data) {
    return axios.post(webhook, data)
}

function updateResultInDB(id) {
    return gql.client.request(gqlConstants.UPDATE_TASK_RESULT, {task:id})
}