define([
    "backbone",
    "models/narrator",
    "collections/players"
],
function (
    Backbone,
    NarratorModel,
    PlayerCollection
    ) {
    return Backbone.Model.extend({
        urlRoot: 'http://localhost:3000/games',
        idAttribute: '_id',

        initialize: function() {
            this._players = new PlayerCollection(this.id, this.get('players'));
        },
/*        initialize: function(id) {
            // make a backbone collection of users?
            this.roles = ["mafia", "townsperson", "doctor"];
            this.players = [];
            this.id = id;
        }, */

        addPlayer: function(username, picture) {
            var playerDict = { username: username,
                               picture: picture };

            this._players.addNewPlayer(playerDict);
            // Success
            return true;  
        },

        startGame: function() {
            var self = this;
            _.each(this.players, function(player) {
                // the server will push this data,
                // when we have a real one
                player.setRole(self.roles.pop());
            });
        }
    });
});
