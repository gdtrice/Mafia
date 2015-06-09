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
            return '/games/' + this._gameId + '/players';
        },
        model: Player,

        initialize: function(players, options) {
            this._gameId = options.gameId;
        },
        addNewPlayer: function(player) {
            // TODO: make the sever respond with the returned row
            return this.create(player, {async: false});
        }
    });
});
