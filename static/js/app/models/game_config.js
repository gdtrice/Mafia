define([
    "backbone",
    "models/game"
],
function (
    Backbone,
    GameModel
    ) {

    // Mocking some the service for now...
    return Backbone.Model.extend({
        createGame: function(username) {
            this.game = new GameModel(username);
            return this.game;
        },

        joinGame: function(gameCode) {
            if(gameCode === GAMECODE) {
                 this.game.addPlayer(username);
                 // a random user probably shouldn't get full
                 // access to a game, but hacking this up really quick.
                 return this.game;
            }
        }
    });
});
