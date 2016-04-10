var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/mfnode');
var _ = require('underscore');

gs = function GameSocket(server) {
    var io = require('socket.io')(server);

    io.on('connection', function(socket){
        socket.on('start_game', function(data) {
            socket.join(data.gameId);
            console.log('connection established from client:' + socket.id);
            var collection = db.get('gamecollection');
            // Kinda hacky...Count the users in the room before starting
            if (Object.keys(io.nsps["/"].adapter.rooms[data.gameId]).length === data.totalPlayers) {
                io.to(data.gameId).emit('detective_action', 'server can hear you loud and clear'); 
            }
        });

        socket.on('disconnect', function() {
            console.log('a user disconnected');
        });

        // This is the first action that can be taken as the service currently stands
        // Will create an entry in the db to start a round
        socket.on('investigate', function(data) {
            // TODO: check if this is the correct user (i.e. detective)
            var collection = db.get('gamecollection');
            var isUserMafia = false;

            // TODO: SUPER HACK!!! Make this query better!!!!!!!
            collection.find({_id: data.gameId },{}, function(e, docs) {
                var player = _.findWhere(docs[0].players, { username: data.player});

                // TODO: do null check for player
                // TODO: ensure that this action hasn't occurred before
                isUserMafia = (player.role.name == "mafia");
                var roundData = {game_id: data.gameId,
                                 create_date: Date.now()};
                roundData.night_data = {player_investigated: player.username,
                                       player_kill_target: null,
                                       player_save_target: null};

                var roundCollection = db.get('roundcollection');
                roundCollection.insert(roundData, function(error, doc) {
                    // do something
                });
            });

            io.to(data.gameId).emit('investigate_registered', {result: "Results from your investigation: " + isUserMafia});
        });

        socket.on('investigate_done', function(data) {
            io.to(data.gameId).emit('mafia_action', 'server can hear you loud and clear'); 
        });

        socket.on('kill', function(data) {
            // TODO: check if this is the correct user (i.e. mafia)
            var roundCollection = db.get('roundcollection');

            // TODO: SUPER HACK!!! Make this query better!!!!!!!
            roundCollection.find({game_id: data.gameId }, {}, function(e, docs) {

                // can we use the current doc instead of doing another query??
                roundCollection.update(
                    { game_id: data.gameId },
                    { $set: 
                        {
                            "night_data.player_kill_target": data.player
                        }
                });
            });

            io.to(data.gameId).emit('kill_registered', {result: "Will attempt to kill " + data.player});
        });

        socket.on('kill_done', function(data) {
            io.to(data.gameId).emit('doctor_action', 'server can hear you loud and clear'); 
        });

        socket.on('save', function(data) {
            // TODO: check if this is the correct user (i.e. doctor)
            var roundCollection = db.get('roundcollection');

            // TODO: SUPER HACK!!! Make this query better!!!!!!!
            roundCollection.find({game_id: data.gameId }, {}, function(e, docs) {

                // can we use the current doc instead of doing another query??
                roundCollection.update(
                    { game_id: data.gameId },
                    { $set: 
                        {
                            "night_data.player_save_target": data.player
                        }
                });

                io.to(data.gameId).emit('save_registered', {result: data.player + " will live to fight another day"});
            });
        });

        socket.on('save_done', function(data) {
            var killedPlayer = null;

            // TODO: SUPER HACK!!! Make this query better!!!!!!!
            var roundCollection = db.get('roundcollection');
            roundCollection.find({game_id: data.gameId }, {}, function(e, docs) {

                var killTarget = docs[0].night_data.player_kill_target;
                var saveTarget = docs[0].night_data.player_save_target;

                // If the kill target is not the saved player. That player gets killed.
                if (killTarget !== saveTarget) {
                    killedPlayer = killTarget;
                    var gameCollection = db.get("gamecollection");
                    gameCollection.find({ _id: data.gameId}, {}, function(e, games) {
                        var player = _.findWhere(games[0].players, {username: killTarget});
                        player.role.is_alive = false;

                        //TODO: Do we need to requery?
                        gameCollection.update({ _id: data.gameId },{$set: {players: games[0].players}});
                    });
                }

                io.to(data.gameId).emit('night_results', {killedPlayer: killedPlayer});
            });
        });

        socket.on('day_council_start', function(data) {
            var killedPlayer = null;

            // TODO: SUPER HACK!!! Make this query better!!!!!!!
            var roundCollection = db.get('roundcollection');
            roundCollection.find({game_id: data.gameId }, {}, function(e, docs) {

                var killTarget = docs[0].night_data.player_kill_target;
                var saveTarget = docs[0].night_data.player_save_target;

                // If the kill target is not the saved player. That player gets killed.
                if (killTarget !== saveTarget) {
                    killedPlayer = killTarget;
                    var gameCollection = db.get("gamecollection");
                    gameCollection.find({ _id: data.gameId}, {}, function(e, games) {
                        var player = _.findWhere(games[0].players, {username: killTarget});
                        player.isAlive = false;

                        //TODO: Do we need to requery?
                        gameCollection.update({ _id: data.gameId },{$set: {players: games[0].players}});
                    });
                }

                io.to(data.gameId).emit('day_action', {killedPlayer: killedPlayer});
            });
        });
    });
};

module.exports = gs;
