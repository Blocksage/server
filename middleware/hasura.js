module.exports = (req, res, next) => {
    if(req && req.body && req.body.input) {
        req.body = req.body.input
    }
    next()
}