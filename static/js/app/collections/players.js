define([
    "backbone",
    "underscore",
    "models/player"
],
function (
    Backbone,
    _,
    Player
    ) {
    return Backbone.Collection.extend({
        url: function() {
            return 'http://localhost:3000/games/' + this._gameId + '/players';
        },
        model: Player,

        initialize: function(gameId, players) {
            this._gameId = gameId;
        },
        addNewPlayer: function(player) {
            return this.create(player, {async: false});
        }
    });
});

