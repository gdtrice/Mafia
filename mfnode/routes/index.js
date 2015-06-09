var express = require('express');
var router = express.Router();
var _ = require('underscore');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mafia' });
});

/* GET to Avaliable Games */
router.get('/games', function(req, res) {

    var db = req.db;
    var collection = db.get('gamecollection');
    collection.find({},{}, function(e, docs) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(docs));
    });
});

/* GET a specific Game */
router.get('/games/:id', function(req, res) {

    var db = req.db;
    var collection = db.get('gamecollection');
    // usefindbyid
    collection.find({ _id: req.params.id },{}, function(e, docs) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(docs[0]));
    });
});

/* GET the Players of a Game */
router.get('/games/:id/players', function(req, res) {

    var db = req.db;
    var collection = db.get('gamecollection');
    // TODO: usefindbyid
    // TODO: return only the players
    collection.find({ _id: req.params.id },{}, function(e, docs) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(docs[0]));
    });
});

/* POST to add new Player to Game */
router.post('/games/:id/players', function(req, res) {

    var db = req.db;
    var collection = db.get('gamecollection');
    collection.update({ _id: req.params.id },{$push: {players: { username: req.body.username, picture: req.body.picture }}}, function(e, docs) {
        res.setHeader('Content-Type', 'application/json');
        // This doesn't return the updated model...investigate
        res.send(JSON.stringify(docs));
    });
});

/* POST to create Games */
router.post('/games', function(req, res) {
    var db = req.db;
    var collection = db.get('gamecollection');
    var self_res = res;
    // TODO (gtrice): strip the desired values from the request
    // Currently allowing anything to be inserted
    req.body.createDate = Date.now();
    collection.insert(req.body, function(error, doc) {
        self_res.send(JSON.stringify(doc));
    });
});

/* GET to Start a specific Game */
router.get('/games/:id/start', function(req, res) {
    var db = req.db;
    var collection = db.get('gamecollection');
    // usefindbyid
    collection.find({ _id: req.params.id },{}, function(e, docs) {
        var document = docs[0];
        if (_.isEmpty(document.startDate)) {
            var players = document.players;
            // HACKY...
            // assign each player as townsperson the grab a random player and 
            // assign as mafia
            _.each(players, function(player) {
                player.role = { name: 'townsperson',
                                picture: 'http://www.renfair.com/images/nyrf_amenities.jpg'
                            };
            });
            var mafia = _.sample(players);
            mafia.role = { name: 'mafia',
                           picture: 'http://www.abcjogos.com.br/wp-content/uploads/2011/12/The-Godfather.jpg?7de635'
                        };

            collection.update({ _id: req.params.id },{$set: {players: players, startDate: Date.now()}}, console.log);
        }

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(document));
    });
});

module.exports = router;
