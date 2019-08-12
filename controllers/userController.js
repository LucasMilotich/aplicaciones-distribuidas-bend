import Mongo from '../db/mongo';

const errorBuilder = require('../domain/error')


export default class UserController{

    constructor(){
        
        
    }
    

    login(req, res,next){
        console.log(req)
        let username = req.body.username
        let password = req.body.password
        let mongo = new Mongo()
        mongo.get("users", {username:username, password:password}).then(elem => {

            if (elem == null){
                res.send(errorBuilder("user not found", 400, "not_found"))
            } else {
                res.send(elem)
            }
            
        })
        
    }
}




