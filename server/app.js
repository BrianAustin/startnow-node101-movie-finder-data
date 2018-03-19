const express = require('express');
const app = express();
const axios = require('axios');
const morgan = require('morgan');
app.use(morgan('dev'));

var cache = {};
//storing request parameters w/ req.query
app.get('/', function(req, res) {
    var movieTitle = req.query.t;
    var movieId = req.query.i;
//checking if movie id or movie title
    if(movieId != undefined) {

        //if data matches with cache, send from cache
        if(cache.MovieId == movieId) {
            res.status(200).json(cache.data);
            console.log('MovieId sent from cache, exciting!!');
        } else {
            console.log('movie not found in cache, use axios, dawg');
            axios
                .get('http://www.omdbapi.com/?i=' + movieId + '&apikey=8730e0e')
                .then(response => {
                    res.status(200).json(response.data);
                    cache = {'MovieId': movieId, 'data': response.data};
                })
                .catch(error => {
                    console.log(error);
            });
        }
    } else {

        if(cache.MovieTitle == movieTitle) {
            res.status(200).json(cache.data);
            console.log('MovieTitle sent from cache, hells yeah...');
        } else {
            console.log('Movie not found in cache, use axios, betch');
            axios
                .get('http://www.omdbapi.com/?t=' + movieTitle.replace(' ', '%20') + '&apikey=8730e0e')
                .then(response => {
                    res.status(200).json(response.data);
                    cache = {'MovieTitle': movieTitle, 'data':response.data};
                })
                .catch(error => {
                    console.log(error);
            });
        }
    }    
});
//export the express application
module.exports = app;





