const { EffectClient, createAccount, createWallet } = require('@effectai/effect-js')

module.exports = {
    publish: async (campaignObj, options) => {
        // Setting up the connection...
        const client = new EffectClient('jungle')
        const account = createAccount(process.env.BLOCKSAGE_EFFECT_PVT_KEY)
        const web3 = createWallet(account)
        const effectAccount = await client.connectAccount(web3)

        const campaignToIpfs = campaignObj

        const efx_quantity = ''+ campaignObj.reward

        const makeCampaign = await client.force.makeCampaign(campaignToIpfs, efx_quantity)
        // console.log('makeCampaign', makeCampaign)
        const result = await client.force.waitTransaction(makeCampaign)
        // console.log('result', result)
        const campaign = await client.force.getMyLastCampaign()
        // console.log('Campaign', campaign)

        const content = {
            'tasks': options.tasks
        }

        const repetitions = 1
        const batchResponse = await client.force.createBatch(campaign.id, content, repetitions)
        // console.log('createBatch', batchResponse)
        await client.force.waitTransaction(batchResponse.transaction)
        const batch = await client.force.getCampaignBatches(campaign.id)
        // console.log(batch)
        return {campaign, batch, batchResponse}
    },

    getResults: async (batchId) => {
        // const batchId = 1391569403904
        const client = new EffectClient('jungle')
        // const account = createAccount(process.env.BLOCKSAGE_EFFECT_PVT_KEY)
        // const web3 = createWallet(account)
        // const effectAccount = await client.connectAccount(web3)
        const taskResults = await client.force.getTaskSubmissionsForBatch(batchId)
        return taskResults
    }
}