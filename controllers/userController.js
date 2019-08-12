var errorBuilder = require('../domain/error')

exports.login = function(req, res,next) {
    const error = errorBuilder("not implemented", 404, "not_implemented")
    return next(error)
};


