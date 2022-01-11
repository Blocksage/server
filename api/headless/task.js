const gql = require('../../services/gql')
const gqlConstants = require('../../services/gql-constants')
const bsc = require('../../services/bsc')
const fs = require('fs')
const ejs = require('ejs')

// TODO: Make it more modular?
module.exports = async (req, res) => {
    // const campaign = await bsc.publish()
    // const result = await bsc.getResults()

    const key = req.headers['x-api-key']
    if (!key) {
        return res.status(400).send({error: 'Please send the header x-api-key'})
    }

    const body = req.body 
    
    if(!body.policy) {
        return res.status(400).send({error: 'Please send the policy slug'})
    }
    const slug = body.policy
    const sampleSize = body.sampleSize

    // Find the policy details
    let response
    try {
        response = await gql.client.request(gqlConstants.POLICY_FROM_KEY_WITH_SLUG, {
            key,
            slug
        })
    }catch(err) {
        console.error(err)
        res.status(500).send({error: err.message})
        return
    }

    const policiesResult = response.keys_by_pk.userByUser.policies
    if(!Array.isArray(policiesResult) || policiesResult.length === 0) {
        res.status(404).send({error: 'No policy found with given slug'})
        return
    }
    const policy = policiesResult[0]
    // load template
    const result = await ejs.renderFile(process.cwd()+ '/templates/youtube.html', {checklist: policy.checklist});
    const campaign = {
        title: `[Moderation] Test if the video is ${slug}`,
        description: 'Watch the video and tell us if it complies with the policy',
        instructions: `## This video may be inappropriate for some users.\n\nThis video has been marked as \"${slug}\" through our system. \n\nIf you choose to Join Campaign, your job will be to watch the video and mark it as \"${slug}\" or \"Otherwise\".\n\n---\n\nYou can only do 1 task per batch."`,
        // template: `<h1>Some template</h1>`, // Insert the checklist here.
        template: result,
        image: 'https://i.ibb.co/xYJnzRr/blur.png',
        category: 'Socials',
        example_task: {'video': 's1P9llDBgww'},
        version: 1,
        reward: 1
    }
    // console.log(campaign)

    const options = {
        sampleSize: '5',
        webhook: 'https://en8s5hmls79vs.x.pipedream.net',
        tasks: [
            {'video': youtube_parser(body.video)},
        ]
    }

    const blockChainResult = await bsc.publish(campaign, options)
    const batchId = blockChainResult.batch[0]?.batch_id
    // save the response from blockchain in the database
    const user = response.keys_by_pk.user
    // {
    //     "task": "{}",
    //     "batch": 100,
    //     "user": "58564f41-c0d7-4171-8a19-ed0ceaee3262",
    //     "webhook": "https://en8s5hmls79vs.x.pipedream.net/"
    //   }
    try {
        const response = await gql.client.request(gqlConstants.INSERT_TASK, {
            task: JSON.stringify(blockChainResult),
            batch: batchId,
            user,
            webhook: body.webhook
        })
        res.send(response)
    } catch(err) {
        console.error(err)
        res.status(500).send({error: 'something went really wrong'})
    }
    // res.send(response)
}

function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}