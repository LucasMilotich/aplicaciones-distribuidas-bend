const api_key = '71a4edb01b7d0d764e48e21bec96f77a'
var http = require("https");

export default class TheMovieDbClient {

   static getImage(path){
        return "https://image.tmdb.org/t/p/w200" + path
    }

    static discoverMovies() {

        var options = {
            "method": "GET",
            "hostname": "api.themoviedb.org",
            "port": null,
            "path": "/3/discover/movie?page=1&include_video=false&include_adult=false&sort_by=popularity.desc&language=en-US&api_key=71a4edb01b7d0d764e48e21bec96f77a",
            "headers": {}
        };
        return new Promise(function(resolve, reject) {
        var req = http.request(options, function (res) {
            var chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                var body = Buffer.concat(chunks);
                let json = JSON.parse(body)

                json.results.forEach(element => {
                    element.poster_path = TheMovieDbClient.getImage(element.poster_path)
                });

                resolve({movies: json.results});
            });

            
        });

        req.on('error', function(err) {
            // This is not a "Second reject", just a different sort of failure
            console.log(err)
            reject(err);
        });

        req.write("{}");
        req.end();
    })
    }

   static  findMovie(keyword){
        var options = {
            "method": "GET",
            "hostname": "api.themoviedb.org",
            "port": null,
            "path": `/3/search/movie?include_adult=false&page=1&query=${keyword}&language=en-US&api_key=71a4edb01b7d0d764e48e21bec96f77a`,
            "headers": {}
          };

          console.log(options)

          return new Promise(function(resolve, reject) {
          var req = http.request(options, function (res) {
            var chunks = [];
          
            res.on("data", function (chunk) {
              chunks.push(chunk);
            });
          
            res.on("end", function () {
                var body = Buffer.concat(chunks);
                let json = JSON.parse(body.toString())
                resolve({movies: json.results});
            });

          });

          req.on('error', function(err) {
            // This is not a "Second reject", just a different sort of failure
            console.log(err)
            reject(err);
        });
          
          req.write("{}");
          req.end();
    }
    )
}

}