

const MongoClient = require('mongodb').MongoClient


export default class Mongo {

    buildConnection() {


        return new Promise(function (resolve, reject) {
            MongoClient.connect('mongodb://admin:admin@localhost:32771', (err, client) => {
                console.log("Conectando a mongo")
                if (err) return console.log(err)
                resolve(client.db('movies'))


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

}





