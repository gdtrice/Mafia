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
            json.players = new PlayerCollection(json.players, { gameId: json._id });
            return json;
        },

        addPlayer: function(username, picture) {
            var playerDict = { username: username,
                               picture: picture };

            var newPlayer = this.get('players').addNewPlayer(playerDict);
            this.set('currentPlayer', newPlayer);
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
                    self.set({startDate: resp.startDate,
                              players: new PlayerCollection(resp.players, { gameId: resp._id })
                    });
                    return self;
                },
                error: function(resp) {
                    console.log('error occured');
                }
            }); 
        },

        getCurrentPlayer: function() {
            // HACK: Reloading this model loses this instance data so this helps keep currentPlayer data in sync
            return this.get('players').findWhere({username: this.get('currentPlayer').get('username')});
        },

        getActivePlayers: function() {
            var self = this;
            return this.get('players').filter(function(player) {
                return player.get('role').is_alive && player.get('username') != self.get('currentPlayer').get('username'); 
            });
        }
    });
});
