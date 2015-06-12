var express = require('express');
var router = express.Router();
var _ = require('underscore');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  var index = path.join(__dirname, '../..', 'index.html');
  res.sendFile(index);
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
            // could be better...
            // assign everyone as townsperson, then sample players from the array, assign a mafia, doc, and detective
            _.each(players, function(player) {
                player.role = { name: 'townsperson',
                                picture: 'http://www.renfair.com/images/nyrf_amenities.jpg'
                            };
            });

            var actionRolePlayers = _.sample(players, 3);
            actionRolePlayers[0].role = {name: 'mafia',
                                         picture: 'http://www.abcjogos.com.br/wp-content/uploads/2011/12/The-Godfather.jpg?7de635'
                        };

            actionRolePlayers[1].role = {name: 'doctor',
                                             picture: 'http://www.how-to-draw-cartoons-online.com/image-files/cartoon-doctor-16.gif'
                        };

            actionRolePlayers[2].role = {name: 'detective',
                                             picture: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQJeD7EIjfiy_IcOI0dguTrKtfVlFmnDUSM9UKVM8QLNhzaaOMkXw'
                        };

            collection.update({ _id: req.params.id },{$set: {players: players, startDate: Date.now()}}, console.log);
        }

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(document));
    });
});

module.exports = router;
