const errorBuilder = require('../domain/error')

import TheMovieDbClient from '../clients/movieDBClient';

export default class MoviesController {
    
    
    
    getMovies(req, res,next){
        TheMovieDbClient.discoverMovies().then(data => {
            res.send(data)
        })
    }

    searchMovies(req, res,next){
        let query = req.query.query
        console.log(req)
        TheMovieDbClient.findMovie(query).then(data => {
            res.send(data)
        })
    }


}




