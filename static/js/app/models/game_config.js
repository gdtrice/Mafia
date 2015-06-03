define([
    "backbone",
    "underscore",
    "models/game",
    "collections/games"
],
function (
    Backbone,
    _,
    Game,
    Games
    ) {

    // Mocking some the service for now...
    return Backbone.Model.extend({
        MAX_GAMES: 100,

        initialize: function() {
            this.gameCount = this.MAX_GAMES;
            this.usedGameCodes = [];
//            this.games = [];
            this.games = new Games();
        },

        createGame: function(username, options) {
            /*this.gameCount--;
            this.usedGameCodes.push(this.gameCount);
            return this.gameCount;*/
            
            var username = "testuser" + this._randomness();
            // TODO: This should be in Game model...
            var newGame = {
                "createDate": "test",
                "startDate" : "test2",
                "endDate"   : "test3",
                "players": [
                        {
                            "name": username,
                            "picture": "http://cat.jpg.to" 
                        }
                ]
            };

            var _options = options;
            var createdGame = this.games.createNewGame(newGame,
                                function(resp, status) {
                                    console.log("Game create successfully");
                                    _options.success(resp.id);
                                },
                                function(resp, status) {
                                    console.log("Error!");
                                    _options.error(resp, status);
                                }
                            ); 
        },

        joinGame: function(gameCode, username) {
            // TODO: need a better way to query for the game
            var username = "testuser" + this._randomness();
            var game = this.games.joinGame(gameCode, username);
            return game;
        },

        _randomness: function() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
        }
    });
});
