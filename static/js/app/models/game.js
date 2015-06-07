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

        addPlayer: function(username, picture) {
            var playerDict = { username: username,
                               picture: picture };

            var newPlayer = this._players.addNewPlayer(playerDict);
            this.get('players').push(newPlayer.attributes);
            return newPlayer;
        },

        startGame: function() {
            var self = this;
            $.ajax({
                async: false,
                url: self.urlRoot + "/" + self.id + "/start",
                success: function(resp) {
                    self.set({
                        startDate: resp.startDate,
                        players: resp.players});
                    return self;
                },
                error: function(resp) {
                    console.log('error occured');
                }
            }); 
        }
    });
});
