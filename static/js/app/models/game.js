define([
    "backbone",
    "models/narrator",
    "models/player"
],
function (
    Backbone,
    NarratorModel,
    Player
    ) {
    return Backbone.Model.extend({
        initialize: function(id) {
            // make a backbone collection of users?
            this.players = [];
            this.id = id;
        },

        addPlayer: function(username, picture) {
            var newPlayer = new Player({ username: username,
                                          picture: picture });
            this.players.push(newPlayer);
            // Success
            return true;  
        }
    });
});

