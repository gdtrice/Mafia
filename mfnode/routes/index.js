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

/* GET the Rounds of a Game */
router.get('/games/:id/rounds', function(req, res) {
    var db = req.db;
    var collection = db.get('roundcollection');
    collection.find({ game_id: req.params.id },{}, function(e, docs) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(docs));
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
                                is_alive: true,
                                picture: 'static/images/townsperson.jpg'
                            };
            });

            // Ultra hacky
            var actionRolePlayers = _.sample(players, 3);
            actionRolePlayers[0].role = {name: 'mafia',
                                         is_alive: true,
                                         picture: 'static/images/mafia.jpg'
                        };

            actionRolePlayers[1].role = {name: 'doctor',
                                         is_alive: true,
                                         picture: 'static/images/doctor.gif'
                        };

            actionRolePlayers[2].role = {name: 'detective',
                                         is_alive: true,
                                         picture: 'static/images/detective.png'
                        };

            collection.update({ _id: req.params.id },{$set: {players: players, startDate: Date.now()}}, console.log);
        }

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(document));
    });
});
/* GET existing rounds */
router.get('/rounds/', function(req, res) {
    var db = req.db;
    var roundCollection = db.get('roundcollection');

    // TODO: SUPER HACK!!! Make this query better!!!!!!!
    roundCollection.find({}, {}, function(e, docs) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(docs));
    });
});

/* GET rounds for a specific game */
router.get('/rounds/:game_id', function(req, res) {
    var db = req.db;
    var roundCollection = db.get('roundcollection');

    // TODO: SUPER HACK!!! Make this query better!!!!!!!
    roundCollection.find({game_id: req.params.game_id }, {}, function(e, docs) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(docs[0]));
    });
});

/* POST a vote to a specific game */
router.put('/vote/:game_id', function(req, res) {
    var db = req.db;
    var roundCollection = db.get('roundcollection');

    // TODO: SUPER HACK!!! Make this query better!!!!!!!
    roundCollection.find({game_id: req.params.game_id }, {}, function(e, docs) {
        // TODO: Implement update if current pattern to avoid inconsistencies
        // https://docs.mongodb.com/manual/tutorial/update-if-current/
        if(docs.length >= 1) {
            var roundInfo = docs[0];
            var dayData = roundInfo.day_data;
            if (dayData) {
                // We can edit the data directly
                var nomineeRecord = _.findWhere(dayData, {nominee: req.body.nominee});
                if (nomineeRecord) {
                    // append to voters array
                    nomineeRecord.voters.push(req.body.voter);
                } else {
                    roundInfo.day_data.push({nominee: req.body.nominee,
                                             voters: [req.body.voter]});
                }

                roundCollection.update({game_id: req.params.game_id}, { $set: { day_data: roundInfo.day_data }});
            } else {
                roundInfo.day_data.push({nominee: req.body.nominee,
                                         voters: [req.body.voter]});
                roundCollection.update({game_id: req.params.game_id}, { $set: { day_data: roundInfo.day_data }});
            }
        } else {
            // Do something
        }

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify('ok'));
    });
});


module.exports = router;
