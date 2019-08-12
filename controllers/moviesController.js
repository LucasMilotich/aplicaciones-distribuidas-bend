const errorBuilder = require('../domain/error')

import TheMovieDbClient from '../clients/movieDBClient';

export default class MoviesController {
    
    
    
    getMovies(req, res,next){
        TheMovieDbClient.discoverMovies().then(data => {
            res.send(data)
        })
    }

    searchMovies(req, res,next){
        const error = errorBuilder("not implemented", 404, "not_implemented")
        return next(error)
    }


}




