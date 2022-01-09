const environment = {
    dev: {
        // Bad practice, but we're on a deadline 🤷‍♂️
        endpoint: 'https://blocksage.herokuapp.com/v1/graphql',
        adminSecret: process.env.BLOCKSAGE_ADMIN_SECRET || 'q&hKM>;54E&/Lq%Q'
    },
    prod: {

    }
}

const env = process.env.NODE_ENV || 'dev'

module.exports = environment[env] // only return one environment