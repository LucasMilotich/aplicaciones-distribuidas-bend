const errorBuilder = require('../domain/error')

export default class CommentsController {
    
    getCommentsByMovie(req, res,next){
        const error = errorBuilder("not implemented", 404, "not_implemented")
        return next(error)
    }

    saveComment(req, res,next){
        const error = errorBuilder("not implemented", 404, "not_implemented")
        return next(error)
    }

}

