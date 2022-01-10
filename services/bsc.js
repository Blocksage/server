const { EffectClient, createAccount, createWallet } = require('@effectai/effect-js')

module.exports = {
    publish: async () => {
        // Setting up the connection...
        const client = new EffectClient('jungle')
        const account = createAccount(process.env.BLOCKSAGE_EFFECT_PVT_KEY)
        const web3 = createWallet(account)
        const effectAccount = await client.connectAccount(web3)

        const campaignToIpfs = {
            title: 'Random Title',
            description: 'Networked well-modulated instruction set',
            instructions: `American whole magazine truth stop whose. On traditional measure example sense peace. Would mouth relate own chair.
            Together range line beyond. First policy daughter need kind miss`,
            template: `<h1>Some template</h1>`,
            image: 'https://images.unsplash.com/photo-1640622308059-b9982ca75964?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
            category: 'Socials',
            example_task: {'image_url': 'https://images.unsplash.com/photo-1640622308059-b9982ca75964?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'},
            version: 1,
            reward: 1
        }

        const efx_quantity = '1'
        const makeCampaign = await client.force.makeCampaign(campaignToIpfs, efx_quantity)
        console.log('makeCampaign', makeCampaign)
        const result = await client.force.waitTransaction(makeCampaign)
        console.log('result', result)
        const campaign = await client.force.getMyLastCampaign()
        console.log('Campaign', campaign)

        const content = {
            'tasks': [
                {"ipfs": "https://ipfs.effect.ai/bafkreiggnttdaxleeii6cdt23i4e24pfcvzyrndf5kzfbqgf3fxjryj5s4"}, 
                {"ipfs": "https://ipfs.effect.ai/bafkreidrxwhqsxa22uyjamz7qq3lh7pv2eg3ykodju6n7cgprmjpal2oga"}, 
                {"ipfs": "https://ipfs.effect.ai/bafkreid2ocabg7mo235uuwactlcf7vzxyagoxeroyrubfufwobtqz3q27q"}, 
                {"ipfs": "https://ipfs.effect.ai/bafkreifu5xciyxpwnmkorzddanqtc66i43q5cn4sdkb3l563yjzd7s3274"}
            ]
        }

        const repetitions = 1
        const batchResponse = await client.force.createBatch(campaign.id, content, repetitions)
        console.log('createBatch', batchResponse)
        await client.force.waitTransaction(batchResponse.transaction)
        const batch = await client.force.getCampaignBatches(campaign.id)
        console.log(batch)
        return campaign
    }
}