define([
    "backbone",
    "underscore",
    "models/game"
],
function (
    Backbone,
    _,
    Game
    ) {

    // Mocking some the service for now...
    return Backbone.Model.extend({
        MAX_GAMES: 100,

        initialize: function() {
            this.gameCount = this.MAX_GAMES;
            this.usedGameCodes = [];
            this.games = [];
        },

        createGame: function(username) {
            this.gameCount--;
            this.usedGameCodes.push(this.gameCount);
            return this.gameCount;
        },

        joinGame: function(gameCode, username) {
            if (!_.contains(this.usedGameCodes, gameCode)) {
                console.log("error: this game code is invalid");
                return null;
            }

            var existingGame = _.find(this.games, function(game) {
                if(gameCode === game.id) {
                    return game;
                }
            }); 

            if(_.isEmpty(existingGame)) {
                console.log("Code exists, but no game created yet. This is the first user for: " + gameCode);
                var game = new Game(gameCode)
                this.games.push(game);
                game.addPlayer(username);

                // a random user probably shouldn't get full
                // access to a game, but hacking this up really quick.
                return game;
            }

            existingGame.addPlayer(username);
            return existingGame;
        }
    });
});
