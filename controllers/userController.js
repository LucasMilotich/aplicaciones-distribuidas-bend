import Mongo from '../db/mongo';

const errorBuilder = require('../domain/error')


export default class UserController {

    constructor() {


    }

    register(req, res, next){
        let username = req.body.username
        let password = req.body.password

        let mongo = new Mongo()
        
        mongo.save("users", { username: username, password: password }).then(elem => {
            console.log(elem)
            if (elem == null) {
                res.send(errorBuilder("user not found", 400, "not_found"))
            } else {
                res.send(elem)
            }

        })
    }


    login(req, res, next) {
        
        let username = req.body.username
        let password = req.body.password

        let mongo = new Mongo()

        mongo.get("users", { username: username, password: password }).then(elem => {

            if (elem == null) {
                res.send(errorBuilder("user not found", 400, "not_found"))
            } else {
                res.send(elem)
            }

        }).catch(err => res.send(errorBuilder(err, 500, "internal_error")) )

    }
}




