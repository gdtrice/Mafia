var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/mfnode');
var _ = require('underscore');

gs = function GameSocket(server) {
    var io = require('socket.io')(server);

    io.on('connection', function(socket){
        console.log('a user connected');
        io.emit('detective_action', 'server can hear you loud and clear'); 

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
                      
                var roundData = {game_id: data.gameId};
                roundData.night_data = {player_investigated: player.username,
                                       player_kill_target: null,
                                       player_saved: null};

                var roundCollection = db.get('roundcollection');
                roundCollection.insert(roundData, function(error, doc) {
                    // do something
                });
            });

            socket.emit('investigate_registered', {result: isUserMafia});
            // Should probably delay this!
            io.emit('mafia_action', 'server can hear you loud and clear'); 
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

            socket.emit('kill_registered', {result: "Will attempt to kill " + data.player});
            // Should probably delay this!
            io.emit('doctor_action', 'server can hear you loud and clear'); 
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
                            "night_data.player_saved": data.player
                        }
                });
            });
            socket.emit('save_registered', {result: data.player + " gets to live to fight another day"});

            // Should probably delay this!
            io.emit('day_begin');
        });
    });
};

module.exports = gs;
