import Mongo from '../db/mongo';

const errorBuilder = require('../domain/error')


export default class CommentsController {
    
    getCommentsByMovie(req, res,next){
        let movieId = parseInt(req.params.movieId,10)

        let mongo = new Mongo()
        mongo.getAll("comments",{movie_id : movieId}).then(elem => {
            console.log(elem)
            if (elem == null) {
                res.send(errorBuilder("comments not found", 400, "not_found"))
            } else {
                res.send({comments:elem})
            }

    })
}

    saveComment(req, res,next){
        const error = errorBuilder("not implemented", 404, "not_implemented")
        return next(error)
    }

}

