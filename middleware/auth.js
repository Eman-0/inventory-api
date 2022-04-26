const utilities = require('../misc/utilities')

const auth = async function (req, res, next) {
    if (req.header("api_key") != 'cs4783ftw!'){
        utilities.sendResponse(res, 401, 'Authentication failed')
    } else {
        next()
    }
}

module.exports = auth;