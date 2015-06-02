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

            // This should be in Game model...
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
            /*if (!_.contains(this.usedGameCodes, gameCode)) {
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
            return existingGame;*/

            // need a better way to query for the game
            var game = this.games.getGame(gameCode);
            /*var joinedGame = this.games.joinGame(gameCode, username,
                    function(resp, status) {
                        console.log("game config: game joined!");
                    },
                    function(resp, status) {
                        console.log("game config: error!");
                    }
                );*/
        }
    });
});
