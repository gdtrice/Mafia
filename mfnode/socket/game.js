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

            // TODO: SUPER HACK!!! Make this query better!!!!!!!
            collection.find({_id: data.gameId },{}, function(e, docs) {
                var isUserMafia = false;
                _.each(docs[0].players, function(player) {
                    if(player.username == data.player){
                        isUserMafia = (player.role.name == "mafia");
                    }
                      
                });

                socket.emit('investigate_registered', {result: isUserMafia});
                // Should probably delay this!
                io.emit('mafia_action', 'server can hear you loud and clear'); 
            });
        });

        socket.on('kill', function(data) {
            // TODO: check if this is the correct user (i.e. mafia)
            var collection = db.get('gamecollection');

            // TODO: SUPER HACK!!! Make this query better!!!!!!!
            collection.find({_id: data.gameId },{}, function(e, docs) {
            });

            socket.emit('kill_registered', {result: "Will attempt to kill " + data.player});
            // Should probably delay this!
            io.emit('doctor_action', 'server can hear you loud and clear'); 
        });

        socket.on('save', function(data) {
            // TODO: check if this is the correct user (i.e. mafia)
            var collection = db.get('gamecollection');

            // TODO: SUPER HACK!!! Make this query better!!!!!!!
            collection.find({_id: data.gameId },{}, function(e, docs) {
            });

            socket.emit('save_registered', {result: data.player + " gets to live to fight another day"});

            // Should probably delay this!
            io.emit('day_begin');
        });
    });
};

module.exports = gs;
