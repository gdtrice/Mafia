define([
    "backbone",
    "collections/players"
],
function (
    Backbone,
    PlayerCollection
    ) {
    return Backbone.Model.extend({
        urlRoot: '/games',
        idAttribute: '_id',

        parse: function(json) {
            // make the players array a backbone collection
            json.players = new PlayerCollection(json.players, { gameId: json._id });
            return json;
        },

        addPlayer: function(username, picture) {
            var playerDict = { username: username,
                               picture: picture };

            var newPlayer = this.get('players').addNewPlayer(playerDict);
            return newPlayer;
        },

        startGame: function() {
            var self = this;
            $.ajax({
                async: false,
                url: self.urlRoot + "/" + self.id + "/start",
                success: function(resp) {
                    // TODO: investigate merge collections stuff...this is inefficient and will cause bugs later
                    // losing refs to the initial collection would suck
                    // This is basically parse() clean this up.
                    self.set({
                        startDate: resp.startDate,
                        players: new PlayerCollection(resp.players, { gameId: resp._id })
                    });
                    return self;
                },
                error: function(resp) {
                    console.log('error occured');
                }
            }); 
        },

        getPlayerRole: function(username) {
            var user = this.get('players').findWhere({ username: username});
            return user;
        }
    });
});
