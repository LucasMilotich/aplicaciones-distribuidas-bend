

const MongoClient = require('mongodb').MongoClient


export default class Mongo {

    buildConnection() {


        return new Promise(function (resolve, reject) {
            MongoClient.connect("mongodb+srv://admin:admin@cluster0-rwppz.mongodb.net/test?retryWrites=true&w=majority", (err, client) => {
                //MongoClient.connect("mongodb://admin:admin@localhost:32772", (err, client) => {
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
                    if (err)  reject(err);
                    console.log(items);
                    resolve(items)

                });


            })
        })


    }

    getAll(collection, query) {

        let instance = this;
        return new Promise(function (resolve, reject) {
            instance.buildConnection().then(db => {

                console.log("query to execute" + JSON.stringify(query))
                console.log("collection " + collection)

                db.collection(collection).find(query).toArray(function(err, result) {
                    if (err) throw err;
                    console.log(result);
                    resolve(result)
                  })


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

    update(collection, elementToUpdate, newElement) {

        
        let instance = this;
        
        return new Promise(function (resolve, reject) {
            console.log("before deleted")
            instance.delete(collection, elementToUpdate).then((elem) => {
                console.log("deleted " + elem)
                instance.buildConnection().then(db => {


                    console.log("to update" + JSON.stringify(newElement))
                    console.log("collection " + collection)
                    instance.delete(collection, elementToUpdate).then(()=>{
                        db.collection(collection).insert(newElement, function (err, items) {
                            if (err) reject(err);
                            console.log(newElement);
                            resolve(newElement)
        
                        });
                    })
                    
    
    
                })
            }).catch(err => { console.log(err)})
            
            
        })

    }


    delete (collection, elementToDelete){
        let instance = this;
        console.log("before delete 0 ")
        return new Promise(function (resolve, reject) {
            console.log("before delete 1 ")
            instance.buildConnection().then(db => {

                console.log("to delete" + JSON.stringify(elementToDelete))
                console.log("collection " + collection)

                db.collection(collection).deleteOne(elementToDelete, elementToDelete, function (err, items) {
                    if (err) reject(err);
                    console.log(elementToDelete);
                    resolve(elementToDelete)

                });


            })
        })


    }

}
