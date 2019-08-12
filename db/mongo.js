

const MongoClient = require('mongodb').MongoClient


export default class Mongo {

    buildConnection() {


        return new Promise(function (resolve, reject) {
            MongoClient.connect("mongodb+srv://admin:admin@cluster0-rwppz.mongodb.net/test?retryWrites=true&w=majority", (err, client) => {
                console.log("Conectando a mongo")
                if (err) return console.log(err)
                resolve(client.db('test'))


            })

        })
    }

    get(collection, query) {

        let instance = this;
        return new Promise(function (resolve, reject) {
            instance.buildConnection().then(db => {

                console.log("query to execute" + JSON.stringify(query))
                console.log("collection " + collection)

                db.collection(collection).findOne(query, function (err, items) {
                    if (err) throw err;
                    console.log(items);
                    resolve(items)

                });


            })
        })


    }

    save(collection, element) {

        let instance = this;
        
        return new Promise(function (resolve, reject) {
            instance.buildConnection().then(db => {

                console.log("query to execute" + JSON.stringify(element))
                console.log("collection " + collection)

                db.collection(collection).insert(element, function (err, items) {
                    if (err) reject(err);
                    console.log(element);
                    resolve(element)

                });


            })
        })


    }

}
