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

        let username = req.body.username
        let comment = req.body.comment
        let movieId = req.body.movie_id

        let mongo = new Mongo()
        
        mongo.save("comments", { username: username, comment: comment, movie_id: movieId }).then(elem => {
            console.log(elem)
            if (elem == null) {
                res.send(errorBuilder("error in comment", 500, "error"))
            } else {
                res.send(elem)
            }

        })
    }

}

