const errorBuilder = require('../domain/error')

import TheMovieDbClient from '../clients/movieDBClient';

export default class MoviesController {
    
    
    
    getMovies(req, res,next){
        TheMovieDbClient.discoverMovies().then(data => {
            res.send(data)
        }).catch(
            res.status(500).send(errorBuilder("The movie db caida", 500, "internal.error"))
        )
    }

    searchMovies(req, res,next){
        let query = req.query.query
        
        TheMovieDbClient.findMovie(query).then(data => {
            res.send(data)
        }).catch(
            res.status(500).send(errorBuilder("The movie db caida", 500, "internal.error"))
        )
            
    }


}




